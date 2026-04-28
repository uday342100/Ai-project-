
const express = require('express');
const cors = require('cors');
const db = require('./db');
const { aStar, bfs, dfs, createGrid } = require('./algorithms');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const GRID_WIDTH = 40;
const GRID_HEIGHT = 30;
const OBSTACLES = [];

const addRect = (x, y, w, h) => {
    for (let i = x; i < x + w; i++) {
        for (let j = y; j < y + h; j++) {
            OBSTACLES.push({ x: i, y: j });
        }
    }
};

// 1. External Walls
for (let i = 0; i < GRID_WIDTH; i++) {
    OBSTACLES.push({ x: i, y: 0 });
    if (!(i >= 18 && i <= 22)) OBSTACLES.push({ x: i, y: 29 });
}
for (let i = 0; i < GRID_HEIGHT; i++) {
    OBSTACLES.push({ x: 0, y: i });
    OBSTACLES.push({ x: 39, y: i });
}

// 2. Room Partitions
addRect(0, 15, 15, 1); addRect(25, 15, 15, 1);
addRect(15, 0, 1, 12); addRect(25, 0, 1, 12);
addRect(15, 18, 1, 12); addRect(25, 18, 1, 12);

// 3. ENHANCED DENSE SHELVES (Adding more racks)
// Tech Room
addRect(2, 2, 2, 4); addRect(2, 8, 2, 4); addRect(6, 2, 2, 4); addRect(6, 8, 2, 4); addRect(10, 2, 2, 4); addRect(10, 8, 2, 4);
// Science Room
addRect(28, 2, 2, 4); addRect(28, 8, 2, 4); addRect(32, 2, 2, 4); addRect(32, 8, 2, 4); addRect(36, 2, 2, 4); addRect(36, 8, 2, 4);
// Humanities Room
addRect(2, 18, 2, 3); addRect(2, 23, 2, 3); addRect(6, 18, 2, 3); addRect(6, 23, 2, 3); addRect(10, 18, 2, 3); addRect(10, 23, 2, 3);
// Management Room
addRect(28, 18, 2, 3); addRect(28, 23, 2, 3); addRect(32, 18, 2, 3); addRect(32, 23, 2, 3); addRect(36, 18, 2, 3); addRect(36, 23, 2, 3);

const ROOMS = [
    { name: "TECHNOLOGY", x: 1, y: 1, w: 14, h: 14, color: "rgba(239, 246, 255, 1)" },
    { name: "SCIENCE", x: 26, y: 1, w: 13, h: 14, color: "rgba(240, 253, 244, 1)" },
    { name: "HUMANITIES", x: 1, y: 16, w: 14, h: 13, color: "rgba(253, 242, 248, 1)" },
    { name: "MANAGEMENT", x: 26, y: 16, w: 13, h: 13, color: "rgba(255, 251, 235, 1)" }
];

const MOCK_BOOKS = [
    { id: 1, title: 'The Great Gatsby', category: 'Fiction', subcategory: 'Classic', rack: 'H1-A', floor: 1, x: 2, y: 24, isbn: '9780743273565' },
    { id: 2, title: 'A Brief History of Time', category: 'Science', subcategory: 'Physics', rack: 'S2-B', floor: 2, x: 28, y: 4, isbn: '9780553380163' },
    { id: 3, title: 'The Hobbit', category: 'Fiction', subcategory: 'Fantasy', rack: 'H3-C', floor: 1, x: 6, y: 24, isbn: '9780547928227' },
    { id: 4, title: 'Code Complete', category: 'Technology', subcategory: 'Engineering', rack: 'T4-D', floor: 3, x: 2, y: 4, isbn: '9780735619678' },
    { id: 5, title: 'Algorithm Design', category: 'Technology', subcategory: 'CS', rack: 'T1-E', floor: 3, x: 6, y: 4, isbn: '9780262033848' },
    { id: 6, title: 'Thinking, Fast and Slow', category: 'Psychology', subcategory: 'Behavior', rack: 'M5-F', floor: 2, x: 28, y: 24, isbn: '9780374275631' },
    { id: 7, title: '1984', category: 'Fiction', subcategory: 'Classic', rack: 'H1-B', floor: 1, x: 10, y: 18, isbn: '9780451524935' },
    { id: 8, title: 'To Kill a Mockingbird', category: 'Fiction', subcategory: 'Classic', rack: 'H1-B', floor: 1, x: 10, y: 24, isbn: '9780060935467' },
    { id: 9, title: 'Dune', category: 'Fiction', subcategory: 'Sci-Fi', rack: 'H2-A', floor: 1, x: 2, y: 19, isbn: '9780441172719' },
    { id: 10, title: 'Foundation', category: 'Fiction', subcategory: 'Sci-Fi', rack: 'H2-A', floor: 1, x: 6, y: 19, isbn: '9780553293357' },
    { id: 11, title: 'Cosmos', category: 'Science', subcategory: 'Astronomy', rack: 'S1-A', floor: 2, x: 32, y: 4, isbn: '9780345331359' },
    { id: 12, title: 'The Selfish Gene', category: 'Science', subcategory: 'Biology', rack: 'S1-B', floor: 2, x: 36, y: 4, isbn: '9780192860927' },
    { id: 13, title: 'Sapiens', category: 'Science', subcategory: 'Anthropology', rack: 'S2-A', floor: 2, x: 28, y: 9, isbn: '9780062316097' },
    { id: 14, title: 'Astrophysics in a Hurry', category: 'Science', subcategory: 'Astronomy', rack: 'S2-B', floor: 2, x: 32, y: 9, isbn: '9780393609394' },
    { id: 15, title: 'Clean Code', category: 'Technology', subcategory: 'Software Engineering', rack: 'T1-A', floor: 3, x: 10, y: 4, isbn: '9780132350884' },
    { id: 16, title: 'The Pragmatic Programmer', category: 'Technology', subcategory: 'Software Engineering', rack: 'T2-A', floor: 3, x: 2, y: 9, isbn: '9780201616224' },
    { id: 17, title: 'Design Patterns', category: 'Technology', subcategory: 'Software Engineering', rack: 'T2-B', floor: 3, x: 6, y: 9, isbn: '9780201633610' },
    { id: 18, title: 'You Don\'t Know JS', category: 'Technology', subcategory: 'Web', rack: 'T3-A', floor: 3, x: 10, y: 9, isbn: '9781491904244' },
    { id: 19, title: 'Influence', category: 'Psychology', subcategory: 'Social', rack: 'M1-A', floor: 2, x: 32, y: 24, isbn: '9780061241895' },
    { id: 20, title: 'Man\'s Search for Meaning', category: 'Psychology', subcategory: 'Logotherapy', rack: 'M1-B', floor: 2, x: 36, y: 24, isbn: '9780807014295' },
    { id: 21, title: 'Quiet', category: 'Psychology', subcategory: 'Personality', rack: 'M2-A', floor: 2, x: 28, y: 19, isbn: '9780307352156' },
    { id: 22, title: 'The Power of Habit', category: 'Psychology', subcategory: 'Behavioral', rack: 'M2-B', floor: 2, x: 32, y: 19, isbn: '9780812981605' }
];

// Pre-calculate shortest distance for each book from entrance
MOCK_BOOKS.forEach(book => {
    const grid = createGrid(GRID_WIDTH, GRID_HEIGHT, OBSTACLES);
    const path = aStar(grid, { x: 20, y: 28 }, { x: book.x, y: book.y });
    book.distance = path.length;
});

const apiRouter = express.Router();

apiRouter.get('/books', (req, res) => res.json(MOCK_BOOKS));
apiRouter.get('/books/search', (req, res) => {
    const { title } = req.query;
    res.json(MOCK_BOOKS.filter(b => b.title.toLowerCase().includes(title.toLowerCase())));
});
apiRouter.get('/books/filter', (req, res) => {
    const { category } = req.query;
    res.json(MOCK_BOOKS.filter(b => b.category === category));
});

apiRouter.get('/layout', (req, res) => {
    res.json({ grid: OBSTACLES, rooms: ROOMS });
});

apiRouter.post('/path', async (req, res) => {
    const { book_id, algorithm } = req.body;
    const book = MOCK_BOOKS.find(b => b.id == book_id);
    if (!book) return res.status(404).send('Book not found');
    const start = { x: 20, y: 28 };
    const goal = { x: book.x, y: book.y };
    const grid = createGrid(GRID_WIDTH, GRID_HEIGHT, OBSTACLES);
    let path = [];
    if (algorithm === 'astar') path = aStar(grid, start, goal);
    else if (algorithm === 'bfs') path = bfs(grid, start, goal);
    else if (algorithm === 'dfs') path = dfs(grid, start, goal);
    res.json({ path, grid: OBSTACLES, rooms: ROOMS });
});

app.use('/api', apiRouter);

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
