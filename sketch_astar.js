var scl = 20;

var grid = [];
var walls = [];

var chance = 0.2;
var noPath = false;

var start;
var end;

function mouseDragged() {
    for (cell of grid) {
        if (cell.x < mouseX && cell.x + scl > mouseX) {
            if (cell.y < mouseY && cell.y + scl > mouseY) {
                cell.isWall = true;
                walls.push(cell);
            }
        }
    }
}

function keyPressed() {
    if (key === ' ') {
        for (cell of grid) {
            cell.isWall = false;
        }
        walls = [];
    } else if (key === 'r') {
        randomWalls();
    }
}

function randomWalls() {
    walls = [];
    for (cell of grid) {
        cell.isWall = false;
        if (Math.random() < chance) {
            cell.isWall = true;
            walls.push(cell);
        }   
    }
    start.isWall = false;
    end.isWall = false;
}


function setup() {
    createCanvas(400, 400);
    
    for (let j = 0; j < height / scl; j++) {
        for (let i = 0; i < width / scl; i++) {
            let cell = new Cell(i * scl, j * scl);
            grid.push(cell); 
        }
    }

    start = grid[0];
    end = grid[grid.length - 1];
    start.isWall = false;
    end.isWall = false;

    randomWalls();
}

function draw() {
    background(51);

    let path = Astar(start, end);

    for (cell of grid) {
        cell.show();
        if (path) {
            if (path.includes(cell)) {
                cell.showPath();
            }
        }
    }

    if (!path && !noPath) {
        console.log('No Path');
        noPath = true;
    }
    

    start.highlight()
    end.highlight();
}