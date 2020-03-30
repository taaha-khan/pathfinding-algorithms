
function Astar(start, end) {

    let openList = [];
    let closedList = [];

    openList.push(start)
    start.parent = null;

    while (openList.length > 0) {

        let least = Infinity;
        let current = null;
        for (let i = 0; i < openList.length; i++) {
            if (openList[i].f < least) {
                least = openList[i].f;
                current = openList[i];
            } 
        }

        if (current === end) {
            end.parent = current.parent;
            let path = constructPath(current);
            return path;
        }

        index = openList.indexOf(current);
        openList.splice(index, 1);
        closedList.push(current);

        let neighbors = neighboring(current);
        for (neighbor of neighbors) {
            if (!closedList.includes(neighbor)) {
                if (!openList.includes(neighbor)) {
                    openList.push(neighbor);
                    neighbor.parent = current;
                    // Updating Costs
                    let p = neighbor.parent
                    neighbor.g = dist(neighbor.x, neighbor.y, p.x, p.y) + dist(p.x, p.y, start.x, start.y);
                    neighbor.h = dist(neighbor.x, neighbor.y, end.x, end.y);
                    neighbor.f = neighbor.g + neighbor.h;
                } else if (openList.includes(neighbor)) {
                    let p = current;
                    let pg = dist(neighbor.x, neighbor.y, end.x, end.y) + dist(p.x, p.y, start.x, start.y);
                    let ph = dist(neighbor.x, neighbor.y, end.x, end.y);
                    let pf = pg + ph;
                    if (pf < neighbor.f) {
                        neighbor.g = pg;
                        neighbor.h = ph;
                        neighbor.f = pf;
                    }
                }
            }
        }


    }
    return null;
}

function constructPath(node) {
    let path = [];
    path.push(node)
    while (node.parent) {
        node = node.parent;
        path.push(node)
    }
    return path;
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
        }
    }
    return neighbors;
}