const CANVAS_SIZE = {
    width: 300,
    height: 1200,
}

const TILE_SIZE = {
    width: 30,
    height: 30
}

const FPS = 50;

const BORDER_THICKNESS = 4;

const GRAVITY_VEL = {
    xChange: 0,
    yChange: 5
}

const HORIZONTAL_MOVEMENT_VEL = Object.assign({} , {...GRAVITY_VEL,xChange: 30});

const DOWN_MOVEMENT_VEL = Object.assign({} , {...GRAVITY_VEL,yChange: 10});


const TETROMINOES = {
    'T': {color : "#f024f2", blocks:[{x:0,y:0}, {x:-1 * TILE_SIZE.width,y:0}, {x:1 * TILE_SIZE.width,y:0}, {x:0,y:-1 * TILE_SIZE.height}]},
    'O': {color : "#dbcd00", blocks:[{x:0,y:0}, {x:0,y:-1 * TILE_SIZE.height}, {x:1 * TILE_SIZE.width,y:0}, {x:1 * TILE_SIZE.width,y:-1 * TILE_SIZE.height}]}
    // 'J': [(0, 0), (-1, 0), (0, -1), (0, -2)],
    // 'L': [(0, 0), (1, 0), (0, -1), (0, -2)],
    // 'I': [(0, 0), (0, 1), (0, -1), (0, -2)],
    // 'S': [(0, 0), (-1, 0), (0, -1), (1, -1)],
    // 'Z': [(0, 0), (1, 0), (0, -1), (-1, -1)]
}
