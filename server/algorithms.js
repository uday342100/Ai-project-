
/**
 * Represents a Node in the grid
 */
class Node {
    constructor(x, y, isObstacle = false) {
        this.x = x;
        this.y = y;
        this.isObstacle = isObstacle;
        this.g = Infinity; // Distance from start
        this.h = 0;        // Heuristic distance to end
        this.f = Infinity; // Total score
        this.parent = null;
    }
}

/**
 * A* Pathfinding Algorithm
 */
function aStar(grid, startNode, endNode) {
    const openSet = [grid[startNode.y][startNode.x]];
    grid[startNode.y][startNode.x].g = 0;
    grid[startNode.y][startNode.x].f = heuristic(startNode, endNode);

    while (openSet.length > 0) {
        // Sort by f score
        openSet.sort((a, b) => a.f - b.f);
        const current = openSet.shift();

        if (current.x === endNode.x && current.y === endNode.y) {
            return reconstructPath(current);
        }

        const neighbors = getNeighbors(grid, current);
        for (const neighbor of neighbors) {
            if (neighbor.isObstacle && !(neighbor.x === endNode.x && neighbor.y === endNode.y)) continue;

            const tentativeG = current.g + 1;
            if (tentativeG < neighbor.g) {
                neighbor.parent = current;
                neighbor.g = tentativeG;
                neighbor.h = heuristic(neighbor, endNode);
                neighbor.f = neighbor.g + neighbor.h;
                if (!openSet.includes(neighbor)) {
                    openSet.push(neighbor);
                }
            }
        }
    }
    return []; // No path
}

/**
 * BFS Algorithm
 */
function bfs(grid, startNode, endNode) {
    const queue = [grid[startNode.y][startNode.x]];
    const visited = new Set();
    visited.add(`${startNode.x},${startNode.y}`);
    grid[startNode.y][startNode.x].parent = null;

    while (queue.length > 0) {
        const current = queue.shift();

        if (current.x === endNode.x && current.y === endNode.y) {
            return reconstructPath(current);
        }

        const neighbors = getNeighbors(grid, current);
        for (const neighbor of neighbors) {
            const key = `${neighbor.x},${neighbor.y}`;
            const isTarget = neighbor.x === endNode.x && neighbor.y === endNode.y;
            if ((!neighbor.isObstacle || isTarget) && !visited.has(key)) {
                visited.add(key);
                neighbor.parent = current;
                queue.push(neighbor);
            }
        }
    }
    return [];
}

/**
 * DFS Algorithm
 */
function dfs(grid, startNode, endNode) {
    const stack = [grid[startNode.y][startNode.x]];
    const visited = new Set();
    grid[startNode.y][startNode.x].parent = null;

    while (stack.length > 0) {
        const current = stack.pop();

        if (current.x === endNode.x && current.y === endNode.y) {
            return reconstructPath(current);
        }

        const key = `${current.x},${current.y}`;
        if (!visited.has(key)) {
            visited.add(key);
            const neighbors = getNeighbors(grid, current);
            for (const neighbor of neighbors) {
                const isTarget = neighbor.x === endNode.x && neighbor.y === endNode.y;
                if ((!neighbor.isObstacle || isTarget) && !visited.has(`${neighbor.x},${neighbor.y}`)) {
                    neighbor.parent = current;
                    stack.push(neighbor);
                }
            }
        }
    }
    return [];
}

/**
 * Manhattan distance heuristic
 */
function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function getNeighbors(grid, node) {
    const neighbors = [];
    const { x, y } = node;
    const rows = grid.length;
    const cols = grid[0].length;

    if (x > 0) neighbors.push(grid[y][x - 1]);
    if (x < cols - 1) neighbors.push(grid[y][x + 1]);
    if (y > 0) neighbors.push(grid[y - 1][x]);
    if (y < rows - 1) neighbors.push(grid[y + 1][x]);

    return neighbors;
}

function reconstructPath(node) {
    const path = [];
    let current = node;
    while (current) {
        path.push({ x: current.x, y: current.y });
        current = current.parent;
    }
    return path.reverse();
}

/**
 * Initialize 2D grid
 */
function createGrid(width, height, obstacles = []) {
    const grid = [];
    for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
            const isObstacle = obstacles.some(obs => obs.x === x && obs.y === y);
            row.push(new Node(x, y, isObstacle));
        }
        grid.push(row);
    }
    return grid;
}

module.exports = { aStar, bfs, dfs, createGrid };
