// A* AND DIKSTRA'S PATHFINDING ALGORITHMS

console.log('A* & Dijkstra')

var scl = 10;

var grid = [];
var walls = [];

var chance = 0.2;
var noPath = false;

var start;
var end;

var path = [];



function mouseDragged() {
    for (cell of grid) {
        if (cell.x < mouseX && cell.x + scl > mouseX) {
            if (cell.y < mouseY && cell.y + scl > mouseY) {
                cell.isWall = true;
                walls.push(cell);
            }
        }
        cell.neighbors = neighboring(cell);
    }
}

function keyPressed() {
    if (key === ' ') {
        for (cell of grid) {
            cell.isWall = false;
        }
        getNeighbors(grid);
        path = []; walls = [];
    } else if (key === 'r') {
        randomWalls();
        path = [];
    } else if (key === 'a') {
        path = Astar(start, end);
        if (path) console.log('A*: ' + path.length);
    } else if (key === 'd') {
        path = Dijkstra(grid, start, end);
        if (path) console.log('Dijkstra: ' + path.length);

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

    getNeighbors(grid);
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

    // let path = Astar(start, end);
    // let path = Dijkstra(grid, start, end);

    for (cell of grid) {
        cell.show();
        if (path) {
            noPath = false;
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