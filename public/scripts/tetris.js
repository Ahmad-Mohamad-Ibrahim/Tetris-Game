const TETROMINOES_SHAPES = ['T', 'O', 'J', 'L', 'I', 'S', 'Z', 'I', 'I', 'I', 'L', 'O', 'O', 'O', 'T', 'J'];

function TetrominoQueue() {
    this.tetrominoes = [...TETROMINOES_SHAPES];

    // this.addTetromino = (tetromino) => {
    //     this.tetrominoes.push(tetromino);
    // }
    this.getLen = () => {
        return this.tetrominoes.length;
    }
    this.removeTetromino = () => {
        return this.tetrominoes.shift();
    }

    this.shiftBoard = () => {
        // [1,0,0,0]
        // [0,1,0,0]
        // [0,0,1,0]
        // [0,0,0,1]
        // this.board.shift()
    }

    

    this.randomizeQueue = () => {
        // Fisher-Yates shuffle
        for (let i = this.tetrominoes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // nice way to swap
            [this.tetrominoes[i], this.tetrominoes[j]] = [this.tetrominoes[j], this.tetrominoes[i]];
        }
    }

    this.reinitQueue = () => {
        this.tetrominoes = [...TETROMINOES_SHAPES];
    }
}

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
    this.orien = 0; // 0,1,2,3
    this.markingNumberCounter = 0;

    this.tetrominoQueue = new TetrominoQueue();

    this.context = this.canvas.getContext('2d');

    this.start = () => {
        this.initBoard();
        this.bindKeys();
        this.tetrominoQueue.randomizeQueue();

        this.interval = setInterval(this.updateGameArea, 1 / FPS * 1000);
        this.createNewTetromino();
        this.draw();
    }

    this.updateGameArea = () => {
        this.clear();
        this.update();
        this.draw();
        // check if queue still have shapes
        if (this.tetrominoQueue.getLen() == 0) {
            this.tetrominoQueue.reinitQueue();
            this.tetrominoQueue.randomizeQueue();
        }
    }

    this.createNewTetromino = () => {
        if (this.tetrominoQueue.getLen() == 0) {
            this.tetrominoQueue.reinitQueue();
            this.tetrominoQueue.randomizeQueue();
        }
        this.activeTet?.free();
        this.markingNumberCounter++;
        this.activeX = 80;
        this.activeY = 20;
        this.activeTet = new Tetromino(this.activeX, this.activeY, this.tetrominoQueue.removeTetromino(), this.markingNumberCounter, this.context);
        this.resetOrien();
    }

    this.drawGrid = () => {
        for (let x = 0; x < this.canvas.width; x += TILE_SIZE.width) {
            for (let y = 0; y < this.canvas.height; y += TILE_SIZE.height) {
                this.context.strokeStyle = 'white';
                this.context.strokeRect(x, y, TILE_SIZE.width, TILE_SIZE.height);
            }
        }
    }

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

    this.changeOrien = () => {
        this.orien = (this.orien + 1) % 4; // % 4 keeps the this.orien under 4 => (0 - 3)
    }

    this.resetOrien = () => {
        this.orien = this.activeTet.orien; // % 4 keeps the this.orien under 4 => (0 - 3)
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
                case 'Spacebar':
                    this.move('rotate');
                    break;

                case ' ':
                    this.move('rotate');
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
                    this.markTetromino(0, 0, this.activeTet.shape, 0);
                    this.markTetromino(GRAVITY_VEL.xChange, GRAVITY_VEL.yChange, this.activeTet.shape, this.activeTet.markingNo);
                    this.activeX += GRAVITY_VEL.xChange;
                    this.activeY += GRAVITY_VEL.yChange;
                    this.activeTet.moveGravity();
                } else {
                    this.createNewTetromino();
                }
                break;
            case 'left':
                if (this.checkMove({
                        xChange: HORIZONTAL_MOVEMENT_VEL.xChange * -1,
                        yChange: HORIZONTAL_MOVEMENT_VEL.yChange
                    })) {
                    this.markTetromino(0, 0, this.activeTet.shape, 0);
                    this.markTetromino(HORIZONTAL_MOVEMENT_VEL.xChange * -1, HORIZONTAL_MOVEMENT_VEL.yChange, this.activeTet.shape, this.activeTet.markingNo);
                    this.activeX += HORIZONTAL_MOVEMENT_VEL.xChange * -1;
                    this.activeY += HORIZONTAL_MOVEMENT_VEL.yChange;
                    this.activeTet.moveLeft();
                    // markBoardAt(this.activeX, this.activeY, 1);
                }
                break;
            case 'right':
                if (this.checkMove(HORIZONTAL_MOVEMENT_VEL)) {
                    this.markTetromino(0, 0, this.activeTet.shape, 0);
                    this.markTetromino(HORIZONTAL_MOVEMENT_VEL.xChange, HORIZONTAL_MOVEMENT_VEL.yChange, this.activeTet.shape, this.activeTet.markingNo);

                    this.activeX += HORIZONTAL_MOVEMENT_VEL.xChange;
                    this.activeY += HORIZONTAL_MOVEMENT_VEL.yChange;

                    this.activeTet.moveRight();
                    // markBoardAt(this.activeX, this.activeY, 1);

                }
                break;
            case 'down':
                if (this.checkMove(DOWN_MOVEMENT_VEL)) {
                    this.markTetromino(0, 0, this.activeTet.shape, 0);
                    this.markTetromino(DOWN_MOVEMENT_VEL.xChange, DOWN_MOVEMENT_VEL.yChange, this.activeTet.shape, this.activeTet.markingNo);
                    this.activeY += DOWN_MOVEMENT_VEL.yChange / 2; // because there is movement with gravity
                    this.activeX += DOWN_MOVEMENT_VEL.xChange;
                    this.activeTet.moveDown();
                    // markBoardAt(this.activeX, this.activeY, 1);

                } else {
                    // for one gap situations
                    // this.move('gravity');
                }
                break;
            case 'rotate':
                // have to check rotation and maybe wall bounce here
                if (this.checkRotation()) {
                    this.markTetromino(0, 0, this.activeTet.shape, 0);
                    this.changeOrien();
                    this.activeTet.rotate(this.orien);
                    this.markTetromino(0, 0, this.activeTet.shape, this.activeTet.markingNo);
                } else {
                    // reset orientation
                    // this.resetOrien();
                    // wall bounce
                }

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
            // Math.floor((xChange + block.x) / TILE_SIZE.width)
            let indX = Math.floor((xChange + block.x) / TILE_SIZE.width);
            let indY = Math.floor((yChange + block.y) / TILE_SIZE.height);
            if (indX > this.width || indY > this.height || indX < 0 || indY < 0) {
                return true;
            }

            if (this.board[indY][indX] >= 1 && this.board[indY][indX] != this.activeTet.markingNo) {
                isCol |= true;
            }
        });
        return isCol;
    }

    this.checkRotation = () => {
        this.changeOrien();
        let canRotate = true;
        TETROMINOES[this.activeTet.shape].blocks[this.orien].forEach(block => {
            // check boundaries
            let xPos = block.x * TILE_SIZE.width + this.activeX;
            let xIndex = block.x + Math.floor(this.activeX / TILE_SIZE.width);
            let yIndex = block.y + Math.floor(this.activeY / TILE_SIZE.height);
            let boardPos = this.board[yIndex][xIndex];
            if (xPos <= 0 ||
                xPos > this.canvas.width - WALL_THICKNESS) {
                canRotate &= false;
                console.log("Can't Rotate");
            }

            if (boardPos > 0 && boardPos != this.activeTet.markingNo) {
                canRotate &= false;
                console.log("Can't Rotate");
            }
        });

        this.resetOrien();
        return canRotate;
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

    this.markBoardAt = (xChange, yChange, val) => {
        let indY = Math.floor((this.activeY + yChange) / TILE_SIZE.height);
        let indX = Math.floor((this.activeX + xChange) / TILE_SIZE.width);
        // TODO: fix bug for the y being more than 800
        if (this.board && indX >= 0 && indX < 10 && indY >= 0 && indY < 40) {
            this.board[indY][indX] = val;
        }
    }

    this.markTetromino = (xChange, yChange, shape, val) => {
        console.log(shape);
        TETROMINOES[shape].blocks[this.orien].forEach((block) => {
            this.markBoardAt(xChange + block.x * TILE_SIZE.width, yChange + block.y * TILE_SIZE.height, val);
        });
    }

    this.boardPos = (x, y) => {
        let indX = Math.floor(x / TILE_SIZE.width);
        let indY = Math.floor(y / TILE_SIZE.height);
        return this.board[indY][indX];
    }
}

function Tetromino(x, y, shape, markingNo, ctx) {
    this.markingNo = markingNo;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.shape = shape;
    this.orien = 0; // 5 positions
    this.blockArr = []

    this.draw = function () {
        this.ctx.fillStyle = TETROMINOES[this.shape].color;
        this.ctx.strokeStyle = 'rgb(255,255,255)';
        // clear
        this.free();
        TETROMINOES[this.shape].blocks[this.orien].forEach(tetroBlock => {
            let block = new Block(tetroBlock.x * TILE_SIZE.width + this.x, tetroBlock.y * TILE_SIZE.height + this.y, this.ctx);
            block.draw();
            this.blockArr.push(block)
        });
    }

    this.update = function (xChange, yChange) {
        // update
        this.x += xChange;
        this.y += yChange;
        this.blockArr.forEach(block => {
            block.update(xChange, yChange);
        });
    }

    // free memory
    this.free = function () {
        this.blockArr = [];
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

    this.clear = () => {
        TETROMINOES[this.shape].blocks[this.orien].forEach(tetroBlock => {
            let block = new Block(tetroBlock.x * TILE_SIZE.width + this.x, tetroBlock.y * TILE_SIZE.height + this.y, this.ctx);
            block.clear();
        });
        this.blockArr = [];
    }

    this.rotate = function () {
        this.clear();
        this.orien = (this.orien + 1) % 4;
        this.draw();
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
    // maybe add a delete
    this.clear = function () {
        this.ctx.clearRect(this.x, this.y, TILE_SIZE.width, TILE_SIZE.height);
    }
}


document.body.onload = () => {
    let app = new App();
    app.start();
}