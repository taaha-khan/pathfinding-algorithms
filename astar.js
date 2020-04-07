
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

function heuristic(a, b) {
    let d = dist(a.x, a.y, b.x, b.y);  // Euclidean Distance
    return d;
}
