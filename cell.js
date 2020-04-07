
class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isWall = false;
        this.neighbors = [];

        // A* Stuff
        this.parent = null;
        this.g = 0;
        this.h = 0;
        this.f = 0;

        // Dijkstra Stuff
        this.prev = undefined;
        this.dist = Infinity;
    }

    // Show Functions
    show() {
        fill(51);
        stroke(255);
        rect(this.x, this.y, scl, scl);
        this.showWall();
    }

    highlight() {
        fill(0, 255, 0);
        stroke(255);
        rect(this.x, this.y, scl, scl);
    }

    showPath() {
        fill(0, 255, 0);
        stroke(255);
        rect(this.x, this.y, scl, scl);
    }

    showWall() {
        if (this.isWall) {
            fill(150);
            stroke(255);
            rect(this.x, this.y, scl, scl);
        }
    }
}


function neighboring(node) {
    let neighbors = [];

    for (cell of grid) {
        if (!cell.isWall) {
            if (cell.x == node.x && cell.y == node.y + scl) {
                neighbors.push(cell);  // Below
            } if (cell.x == node.x && cell.y == node.y - scl) {
                neighbors.push(cell);  // Above
            } if (cell.x == node.x + scl && cell.y == node.y) {
                neighbors.push(cell);  // Onright
            } if (cell.x == node.x - scl && cell.y == node.y) {
                neighbors.push(cell);  // Onleft
            }
            if (neighbors.length == 4) return neighbors;
        }
    }
    return neighbors;
}

function getNeighbors(grid) {
    for (let i = 0; i < grid.length; i++) {
        grid[i].neighbors = neighboring(grid[i]);
    }
}
