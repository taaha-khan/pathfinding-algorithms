// A* VISUALIZATION ALGORITHM

console.log('A*');

var scl = 10;
var speed = 10;

var grid = [];
var walls = [];

var chance = 0.2;

var start;
var end;
var noPath = false;
var path;

var pathFound = false;

var openList = [];
var closedList = [];




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


    openList.push(start)
    start.parent = null;

    path = [];
}

function draw() {
    background(51);

    for (let loop = 0; loop < speed; loop++) {

        if (openList.length > 0) {

            let least = Infinity;
            var current = null;
            for (let i = 0; i < openList.length; i++) {
                if (openList[i].f < least) {
                    least = openList[i].f;
                    current = openList[i];
                } 
            }

            if (current === end) {
                pathFound = true;
                end.parent = current.parent;
                path = constructPath(current);
            }


            index = openList.indexOf(current);
            openList.splice(index, 1);
            closedList.push(current);

            // Adding New Neighbors
            let neighbors = current.neighbors;
            for (neighbor of neighbors) {

                // Getting Best G Score
                let gScore = current.g + scl;
                let gScoreBest = false;

                // Checking if spot is new
                if (!closedList.includes(neighbor)) {
                    if (!openList.includes(neighbor)) {

                        // Haven't seen the spot before -> best so far
                        openList.push(neighbor);
                        neighbor.parent = current;

                        gScoreBest = true;
                        neighbor.h = heuristic(neighbor, end);

                    } else if (gScore < neighbor.g) {
                        // Saw the Spot before and new G is better
                        gScoreBest = true;
                    }
                    
                    // Updating Costs
                    if (gScoreBest) {
                        neighbor.g = gScore
                        neighbor.h = heuristic(neighbor, end);
                        neighbor.f = neighbor.g + neighbor.h;

                    }
                }
            }
        } else {
            console.log('No Path');
            noLoop();
        }
    }

    // path = constructPath(current);

    for (cell of grid) {
        cell.show();
        if (openList.includes(cell)) {
            fill(255, 0, 0);
            stroke(255);
            rect(cell.x, cell.y, scl, scl);
        } else if (closedList.includes(cell)) {
            fill(0, 0, 255);
            stroke(255);
            rect(cell.x, cell.y, scl, scl);
        }
        if (pathFound) {
            if (path.includes(cell)) {
                cell.showPath();
            } 
        }

    }

    if (pathFound) noLoop();
    

    start.highlight()
    end.highlight();
}
