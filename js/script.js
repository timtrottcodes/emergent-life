const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gridSize = 40;
let cellSize;
let grid = createGrid(gridSize);
let running = false;
let speed = 300;
let intervalId;
let turn = 0;

// Controls
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const randomBtn = document.getElementById('randomBtn');
const speedRange = document.getElementById('speedRange');
const gridSizeSelect = document.getElementById('gridSizeSelect');
const turnCounter = document.getElementById('turnCounter');
const patternSelect = document.getElementById('patternSelect');

// Resize canvas responsively
function resizeCanvas() {
    const size = Math.min(window.innerWidth * 0.9, 600); // fit for mobile, max 600px
    canvas.width = size;
    canvas.height = size;
    cellSize = canvas.width / gridSize;
    drawGrid();
}
window.addEventListener('resize', resizeCanvas);

// Initialize
resizeCanvas();

// Event Listeners
startBtn.addEventListener('click', () => {
    running = !running;
    startBtn.textContent = running ? "Pause" : "Start";
    if (running) {
        run();
    } else {
        clearInterval(intervalId);
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    running = false;
    startBtn.textContent = "Start";
    grid = createGrid(gridSize);
    turn = 0;
    updateTurn();
    drawGrid();
});

randomBtn.addEventListener('click', () => {
    grid = createGrid(gridSize, true);
    turn = 0;
    updateTurn();
    drawGrid();
});

speedRange.addEventListener('input', e => {
    speed = e.target.value;
    if (running) {
        clearInterval(intervalId);
        run();
    }
});

gridSizeSelect.addEventListener('change', e => {
    gridSize = parseInt(e.target.value);
    grid = createGrid(gridSize);
    turn = 0;
    updateTurn();
    resizeCanvas();
});

patternSelect.addEventListener('change', e => {
    loadPattern(e.target.value);
});

// Allow toggling cells by clicking
canvas.addEventListener('click', e => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / cellSize);
    const y = Math.floor((e.clientY - rect.top) / cellSize);
    grid[y][x] = grid[y][x] ? 0 : 1;
    drawGrid();
});

// Functions
function createGrid(size, randomize = false) {
    return Array.from({ length: size }, () =>
        Array.from({ length: size }, () => randomize ? Math.round(Math.random()) : 0)
    );
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#ccc";
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            ctx.beginPath();
            ctx.rect(x * cellSize, y * cellSize, cellSize, cellSize);
            ctx.fillStyle = grid[y][x] ? "#000" : "#fff";
            ctx.fill();
            ctx.stroke();
        }
    }
}

function nextGeneration() {
    const newGrid = createGrid(gridSize);
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            const neighbors = countNeighbors(x, y);
            if (grid[y][x] === 1) {
                newGrid[y][x] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
            } else {
                newGrid[y][x] = (neighbors === 3) ? 1 : 0;
            }
        }
    }
    grid = newGrid;
    turn++;
    updateTurn();
    drawGrid();
}

function countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const nx = x + j;
            const ny = y + i;
            if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
                count += grid[ny][nx];
            }
        }
    }
    return count;
}

function run() {
    intervalId = setInterval(nextGeneration, speed);
}

function updateTurn() {
    turnCounter.textContent = turn;
}

// Famous Patterns
function loadPattern(name) {
    grid = createGrid(gridSize);
    const mid = Math.floor(gridSize / 2);

    if (name === "glider") {
        const glider = [
            [0, 1], [1, 2], [2, 0], [2, 1], [2, 2]
        ];
        glider.forEach(([dy, dx]) => grid[mid + dy][mid + dx] = 1);
    }

    if (name === "pulsar") {
        // Pulsar 48 cells
        const coords = [
            [2, 4], [2, 5], [2, 6], [2, 10], [2, 11], [2, 12],
            [7, 4], [7, 5], [7, 6], [7, 10], [7, 11], [7, 12],
            [9, 4], [9, 5], [9, 6], [9, 10], [9, 11], [9, 12],
            [14, 4], [14, 5], [14, 6], [14, 10], [14, 11], [14, 12],

            [4, 2], [5, 2], [6, 2], [10, 2], [11, 2], [12, 2],
            [4, 7], [5, 7], [6, 7], [10, 7], [11, 7], [12, 7],
            [4, 9], [5, 9], [6, 9], [10, 9], [11, 9], [12, 9],
            [4, 14], [5, 14], [6, 14], [10, 14], [11, 14], [12, 14],
        ];
        coords.forEach(([dy, dx]) => grid[mid - 7 + dy][mid - 7 + dx] = 1);
    }

    if (name === "gosper") {
        // Gosper Glider Gun (partial, fits best in larger grid)
        const coords = [
            [5, 1], [5, 2], [6, 1], [6, 2],
            [5, 11], [6, 11], [7, 11],
            [4, 12], [8, 12],
            [3, 13], [9, 13],
            [3, 14], [9, 14],
            [6, 15],
            [4, 16], [8, 16],
            [5, 17], [6, 17], [7, 17],
            [6, 18],
            [3, 21], [4, 21], [5, 21],
            [3, 22], [4, 22], [5, 22],
            [2, 23], [6, 23],
            [1, 25], [2, 25], [6, 25], [7, 25],
            [3, 35], [4, 35], [3, 36], [4, 36]
        ];
        coords.forEach(([dy, dx]) => grid[mid - 10 + dy][mid - 20 + dx] = 1);
    }

    turn = 0;
    updateTurn();
    drawGrid();
    patternSelect.value = ""; // reset dropdown
}