let filledBlocksPos = [
    // {x: 0, y: 0} topLeft of a block
]

function App() {
    this.canvas = document.getElementById('tetris'),
        // tetris is 40rowsX10cols we want the same ratio (20 rows aren't shown)
        // this means the one box/pexel will be 30px
        this.canvas.width = CANVAS_SIZE.width;
    this.canvas.height = CANVAS_SIZE.height; // 600 rows are hidden
    this.context = this.canvas.getContext('2d');

    this.start = () => {
        this.interval = setInterval(this.updateGameArea, 1 / FPS * 1000);
        let t = new Tetromino(150, 600, 'O', this.context);
        this.activeTet = t;
        this.draw();
    }

    this.updateGameArea = () => {
        this.clear();
        this.update();
        this.draw();
    }

    this.drawGrid = () => {
        console.log(TILE_SIZE.height);
        console.log(TILE_SIZE.width);
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
        console.log("updating");
        this.activeTet.update(GRAVITY_VEL.xChange, GRAVITY_VEL.yChange);

    }
    this.clear = () => {
        console.log("cleared");
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
            let block = new Block(tetroBlock.x + this.x, tetroBlock.y + this.y, this.ctx);
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
}

function Block(x, y, ctx) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;

    this.draw = function () {
        this.ctx.fillRect(this.x, this.y, TILE_SIZE.width , TILE_SIZE.height);
    }

    this.update = function (xChange, yChange) {
        this.clear();
        this.x += xChange;
        this.y += yChange;
        this.draw();
    }

    this.clear = function() {
        this.ctx.clearRect(this.x, this.y, TILE_SIZE.width, TILE_SIZE.height);    
    }
}


document.body.onload = () => {
    let app = new App();
    app.start();
}
