// DIKSTRA'S PATHFINDING ALGORITHM VISUALIZATION

console.log('Dijkstra')

var scl = 10;
var speed = 10;

var grid = [];
var walls = [];

var chance = 0.2;
var noPath = false;

var start;
var end;

var path;

var Q;



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



    Q = [];
    path = [];

    for (let i in grid) {
        let v = grid[i]
        if (v != start) {
            v.dist = Infinity;
            v.prev = undefined;
        }
        Q.push(v);
    }

    start.dist = 0;
}

function draw() {
    background(51);

        
    for (let loop = 0; loop < speed; loop++) {

        if (Q.length > 0) {
            let least = Infinity;
            var u = null;
            for (let i = 0; i < Q.length; i++) {
                if (Q[i].dist < least) {
                    least = Q[i].dist;
                    u = Q[i];
                }
            }


            let index = Q.indexOf(u);
            Q.splice(index, 1);

            if (u === end) {
                path = tracePath(end, start);
            }

            if (u === null) {
                break            
            }

            let neighbors = u.neighbors;
            for (let i = 0; i < neighbors.length; i++) {
                let v = neighbors[i];
                if (Q.includes(v)) {
                    let alt = u.dist + scl;
                    if (alt < v.dist) {
                        v.dist = alt;
                        v.prev = u;
                    }
                }
            }
        
        } else {
            console.log('No Path');
            noLoop();
        }

    }

    if (u === null) {
        noLoop();
    }

    for (cell of grid) {
        cell.show();
       

        if (!Q.includes(cell)) {
            fill(0, 0, 255);
            stroke(255);
            rect(cell.x, cell.y, scl, scl);
        }

        if (path) {
            noPath = false;
            if (path.includes(cell)) {
                cell.showPath();
            }
        }
    }

    start.highlight()
    end.highlight();
}