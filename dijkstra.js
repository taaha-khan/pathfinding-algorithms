
function Dijkstra(nodes, source, target) {

    let Q = [];

    for (let i in nodes) {
        let v = nodes[i]
        if (v != source) {
            v.dist = Infinity;
            v.prev = undefined;
        }
        Q.push(v);
    }

    source.dist = 0;

    while (Q.length > 0) {
        
        let least = Infinity;
        let u = null;
        for (let i = 0; i < Q.length; i++) {
            if (Q[i].dist < least) {
                least = Q[i].dist;
                u = Q[i];
            }
        }


        let index = Q.indexOf(u);
        Q.splice(index, 1);

        if (u === target) {
            return tracePath(target, source);
        }

        if (u === null) {
            break;
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
    }
    return null;
}

function tracePath(target, source) {
    var S = [];
    var u = target;
    if (u.prev || u === source) {
        while (u) {
            S.push(u);
            u = u.prev;
        }
    }
    return S;
}
