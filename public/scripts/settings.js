const CANVAS_SIZE = {
    width: 200,
    height: 800,
}

const GAME_OVER_AT_ROW = 12;

const TILE_CREATED_AT = 10;

const TILE_SIZE = {
    width: 20,
    height: 20
}

const FPS = 10;

const BORDER_THICKNESS = 4;

const GRAVITY_VEL = {
    xChange: 0,
    yChange: 20
}

const WALL_THICKNESS = 20;

const HORIZONTAL_MOVEMENT_VEL = Object.assign({} , {xChange: 20, yChange: 0});

const FLOOR_THICKNESS = 20;

const DOWN_MOVEMENT_VEL = Object.assign({} , {...GRAVITY_VEL,yChange: 40});


const TETROMINOES = {
    'T': {color : "#f024f2", 
    blocks:[
        [{x:0,y:0}, {x:-1,y:0}, {x:1,y:0}, {x:0,y:-1}], // inverted T
        [{x:0,y:0}, {x:0,y:-1}, {x:0,y:1}, {x:1,y:0}], // side T
        [{x:0,y:0}, {x:-1,y:0}, {x:1,y:0}, {x:0,y:1}], // T
        [{x:0,y:0}, {x:0,y:-1}, {x:0,y:1}, {x:-1,y:0}], // other side T

    ] },
    'O': {color : "#dbcd00", blocks:[
        [{x:0,y:0}, {x:0,y:1}, {x:1, y:0}, {x:1,y:1}], // only one orientation
        [{x:0,y:0}, {x:0,y:1}, {x:1, y:0}, {x:1,y:1}],
        [{x:0,y:0}, {x:0,y:1}, {x:1, y:0}, {x:1,y:1}],
        [{x:0,y:0}, {x:0,y:1}, {x:1, y:0}, {x:1,y:1}],
    ] },

    'J': {color:"blue" ,blocks: [
        [{x:0, y:0}, {x:1,y:0}, {x:-1, y:0}, {x:-1, y:-1}], // |--- up
        [{x:0, y:0}, {x:1,y:-2}, {x:0, y:-1}, {x:0, y:-2}], // L
        [{x:0, y:0}, {x:1,y:0}, {x:-1, y:0}, {x:1, y:1}], // ---| down
        [{x:0, y:0}, {x:-1,y:0}, {x:0, y:-1}, {x:0, y:-2}], // J
    ] },
    'L': {color:"orange" ,blocks: [
        [{x:0, y:0}, {x:1,y:0}, {x:-1, y:0}, {x:1, y:-1}], // ---| up
        [{x:0, y:0}, {x:1,y:0}, {x:0, y:-1}, {x:0, y:-2}], // L 
        [{x:0, y:0}, {x:1,y:0}, {x:-1, y:1}, {x:-1, y:0}], // ---| down
        [{x:0, y:0}, {x:0,y:-2}, {x:0, y:-1}, {x:-1, y:-2}], // 
    ] },
    'I': {color:"cyan" ,blocks: [
        [{x:0, y:0}, {x:0,y:1}, {x:0, y:-1}, {x:0, y:-2}], // vertical

        [{x:0, y:0}, {x:1,y:0}, {x:-1, y:0}, {x:-2, y:0}], // horizontal

        [{x:0, y:0}, {x:0,y:1}, {x:0, y:-1}, {x:0, y:-2}], // vertical

        [{x:0, y:0}, {x:1,y:0}, {x:-1, y:0}, {x:-2, y:0}], // horizontal

    ] },


    'S': {color:"green" ,blocks: [
        [{x:0, y:0}, {x:-1,y:0}, {x:0, y:-1}, {x:1, y:-1}], // S

        [{x:0, y:0}, {x:0,y:1}, {x:-1, y:0}, {x:-1, y:-1}], // |_| up


        [{x:0, y:0}, {x:-1,y:0}, {x:0, y:-1}, {x:1, y:-1}], // S


        [{x:0, y:0}, {x:0,y:1}, {x:-1, y:0}, {x:-1, y:-1}], // |_| up
    ] },
    'Z': {color:"red" ,blocks: [

        [{x:0, y:0}, {x:1,y:0}, {x:0, y:-1}, {x:-1, y:-1}], // Z

        [{x:0, y:0}, {x:0,y:-1}, {x:-1, y:0}, {x:-1, y:1}], // down

        [{x:0, y:0}, {x:1,y:0}, {x:0, y:-1}, {x:-1, y:-1}], // Z

        [{x:0, y:0}, {x:0,y:-1}, {x:-1, y:0}, {x:-1, y:1}], // down
    ]},
    // 'I': [(0, 0), (0, 1), (0, -1), (0, -2)],
    // 'S': [(0, 0), (-1, 0), (0, -1), (1, -1)],
    // 'Z': [(0, 0), (1, 0), (0, -1), (-1, -1)]
}
