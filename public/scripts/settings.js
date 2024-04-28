const CANVAS_SIZE = {
    width: 200,
    height: 800,
}

const TILE_SIZE = {
    width: 20,
    height: 20
}

const FPS = 60;

const BORDER_THICKNESS = 4;

const GRAVITY_VEL = {
    xChange: 0,
    yChange: 10
}

const WALL_THICKNESS = 20;

const HORIZONTAL_MOVEMENT_VEL = Object.assign({} , {...GRAVITY_VEL,xChange: 20});

const FLOOR_THICKNESS = 20;

const DOWN_MOVEMENT_VEL = Object.assign({} , {...GRAVITY_VEL,yChange: 40});


const TETROMINOES = {
    'T': {color : "#f024f2", blocks:[{x:0,y:0}, {x:-1,y:0}, {x:1,y:0}, {x:0,y:-1}]},
    'O': {color : "#dbcd00", blocks:[{x:0,y:0}, {x:0,y:1}, {x:1, y:0}, {x:1,y:1}]},
    'J': {color:"grey" ,blocks: [{x:0, y:0}, {x:-1,y:0}, {x:0, y:-1}, {x:0, y:-2}]},
    // 'L': [(0, 0), (1, 0), (0, -1), (0, -2)],
    // 'I': [(0, 0), (0, 1), (0, -1), (0, -2)],
    // 'S': [(0, 0), (-1, 0), (0, -1), (1, -1)],
    // 'Z': [(0, 0), (1, 0), (0, -1), (-1, -1)]
}
