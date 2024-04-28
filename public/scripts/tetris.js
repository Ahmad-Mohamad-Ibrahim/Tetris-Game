let filledBlocksPos = [
    // {x: 0, y: 0} topLeft of a block
]

function App() {
    this.board = null;

    // tetris is 40rowsX10cols we want the same ratio (20 rows aren't shown)
    // this means the one box/pexel will be 30px

    this.canvas = document.getElementById('tetris');
    this.canvas.width = CANVAS_SIZE.width;
    this.canvas.height = CANVAS_SIZE.height; // 600 rows are hidden
    this.width = Math.floor(this.canvas.width / TILE_SIZE.width);
    this.height = Math.floor(this.canvas.height / TILE_SIZE.height);
    this.interval = null;
    this.activeTet = null;
    this.activeX = 0;
    this.activeY = 0;

    this.context = this.canvas.getContext('2d');

    this.start = () => {
        this.initBoard();
        this.bindKeys();
        this.interval = setInterval(this.updateGameArea, 1 / FPS * 1000);
        this.activeX = 80;
        this.activeY = 20;
        let t = new Tetromino(this.activeX, this.activeY, 'T', this.context);
        this.activeTet = t;
        this.draw();
    }

    this.updateGameArea = () => {
        this.clear();
        this.update();
        this.draw();
    }

    this.drawGrid = () => {
        for (let x = 0; x < this.canvas.width; x += TILE_SIZE.width) {
            for (let y = 0; y < this.canvas.height; y += TILE_SIZE.height) {
                this.context.strokeStyle = 'white';
                this.context.strokeRect(Math.floor(x/ TILE_SIZE.width), Math.floor(y/ TILE_SIZE.height), TILE_SIZE.width, TILE_SIZE.height);
            }
        }
    }

    // this.drawFloor = () => {
    //     for (let x = 0; x < this.canvas.width; x += TILE_SIZE.width) {
    //         this.context.fillStyle = 'white';
    //         this.context.fillRect(x, this.canvas.height - TILE_SIZE.height, TILE_SIZE.width, TILE_SIZE.height);
    //     }
    // }

    this.draw = () => {
        console.log("drawn");
        this.drawGrid();
        // test draw a T
        this.activeTet.draw();
    }

    this.update = () => {
        console.log("moves with gravity");
        this.move('gravity');
    }

    this.clear = () => {
        console.log("cleared");
    }

    this.initBoard = () => {
        this.board = [];
        for (let i = 0; i < this.height; i++) {
            this.board.push([]);
            for (let j = 0; j < this.width; j++) {
                this.board[i].push(0);
            }
        }
    }

    this.bindKeys = () => {
        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    this.move('left');
                    break;
                case 'ArrowRight':
                    this.move('right');
                    break;
                case 'ArrowDown':
                    this.move('down');
                    break;
                case 'Space':
                    this.move('rotate');
                    break;
            }
        });
    }

    this.move = (dir) => {
        switch (dir) {
            case 'gravity':
                if (this.checkMove(GRAVITY_VEL)) {
                    // markBoardAt(this.activeX, this.activeY, 0);
                    this.activeX += GRAVITY_VEL.xChange;
                    this.activeY += GRAVITY_VEL.yChange;
                    this.activeTet.moveGravity();
                    // markBoardAt(this.activeX, this.activeY, 1);
                }
                break;
            case 'left':
                if (this.checkMove({ xChange: HORIZONTAL_MOVEMENT_VEL.xChange * -1, yChange: HORIZONTAL_MOVEMENT_VEL.yChange })) {
                    // markBoardAt(this.activeX, this.activeY, 0);
                    this.activeX += HORIZONTAL_MOVEMENT_VEL.xChange * -1;
                    this.activeTet.moveLeft();
                    // markBoardAt(this.activeX, this.activeY, 1);
                }
                break;
            case 'right':
                if (this.checkMove(HORIZONTAL_MOVEMENT_VEL)) {
                    // markBoardAt(this.activeX, this.activeY, 0);
                    this.activeX += HORIZONTAL_MOVEMENT_VEL.xChange;
                    this.activeTet.moveRight();
                    // markBoardAt(this.activeX, this.activeY, 1);

                }
                break;
            case 'down':
                if (this.checkMove(DOWN_MOVEMENT_VEL)) {
                    // markBoardAt(this.activeX, this.activeY, 0);
                    this.activeY += DOWN_MOVEMENT_VEL.yChange;
                    this.activeTet.moveDown();
                    // markBoardAt(this.activeX, this.activeY, 1);

                }
                break;
            case 'rotate':
                // if (this.checkMove('RT')) {
                //     this.activeTet.rotate();
                // }
                break;
        }
    }
    this.checkMove = (xyChange) => {
        console.log("checking move");
        if (this.isOutBoundaries(xyChange.xChange, xyChange.yChange) ||
            this.isCollision(xyChange.xChange, xyChange.yChange)) {
            return false;
        } else {
            return true;
        }
    }
    this.isCollision = (xChange, yChange) => {
        let isCol = false;
        this.activeTet.blockArr.forEach(block => {
            // block.y is the exact y in the canvas
            // block.y / TILE_SIZE.height is the y position on a grid with one pixel equal to 30X30
            let indX = Math.floor(xChange / TILE_SIZE.width) + Math.floor(block.x / TILE_SIZE.width);
            let indY = Math.floor(yChange / TILE_SIZE.height) + Math.floor(block.y / TILE_SIZE.height);
            if (indX > this.width || indY > this.height || indX < 0 || indY < 0) {
                return true;
            }

            if (this.board[indY][indX] === 1) {
                isCol |= true;
            }
        });
        // if(isCol)
        //     console.log("COL");
        return isCol;
    }

    // takes x and y change
    this.isOutBoundaries = (xChange, yChange) => {
        let isOB = false;
        this.activeTet.blockArr.forEach(block => {
            if (xChange + block.x < 0 ||
                xChange + block.x > this.canvas.width - WALL_THICKNESS ||
                yChange + block.y < 0 ||
                yChange + block.y > this.canvas.height - FLOOR_THICKNESS) {
                isOB |= true;
                console.log("OB");
            }
        });

        return isOB;
    }

    markBoardAt = (x,y,val) => {
        if(this.board) {
            console.log(y / TILE_SIZE.height);
            console.log(x / TILE_SIZE.width);
            this.board[Math.floor(y / TILE_SIZE.height)][Math.floor(x / TILE_SIZE.width)] = val; 
        }
    }
}

function Tetromino(x, y, shape, ctx) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.shape = shape;
    this.rotation = 0; // 5 positions
    this.blockArr = []

    this.draw = function () {
        this.ctx.fillStyle = TETROMINOES[this.shape].color;
        this.ctx.strokeStyle = 'rgb(255,255,255)';
        TETROMINOES[this.shape].blocks.forEach(tetroBlock => {
            let block = new Block(tetroBlock.x * TILE_SIZE.width + this.x, tetroBlock.y * TILE_SIZE.height + this.y, this.ctx);
            block.draw();
            this.blockArr.push(block)
        });
    }

    this.update = function (xChange, yChange) {
        // check if boundaries are exceeded
        this.x += xChange;
        this.y += yChange;
        this.blockArr.forEach(block => {
            block.update(xChange, yChange);
        });
    }

    this.clear = function () {
        this.blockArr.forEach(block => {
            this.blockArr = [];
            block.clear();
        });
    }

    this.moveGravity = function () {
        this.update(0, GRAVITY_VEL.yChange);
    }

    this.moveDown = function () {
        this.update(0, TILE_SIZE.height);
    }

    this.moveLeft = function () {
        this.update(HORIZONTAL_MOVEMENT_VEL.xChange * -1, HORIZONTAL_MOVEMENT_VEL.yChange);
    }

    this.moveRight = function () {
        this.update(HORIZONTAL_MOVEMENT_VEL.xChange, HORIZONTAL_MOVEMENT_VEL.yChange);
    }
}

function Block(x, y, ctx) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;

    this.draw = function () {
        // this.ctx.strokeRect(this.x, this.y, TILE_SIZE.width, TILE_SIZE.height);
        this.ctx.fillRect(this.x, this.y, TILE_SIZE.width, TILE_SIZE.height);
    }

    this.update = function (xChange, yChange) {
        this.clear();
        this.x += xChange;
        this.y += yChange;
        this.draw();
    }

    this.clear = function () {
        this.ctx.clearRect(this.x, this.y, TILE_SIZE.width, TILE_SIZE.height);
    }
}


document.body.onload = () => {
    let app = new App();
    app.start();
}
