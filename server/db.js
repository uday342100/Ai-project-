
// Mocking DB for demo purposes
const books = [
    { id: 1, title: 'The Great Gatsby', category: 'Fiction', subcategory: 'Classic', rack: 'A1', floor: 1, x: 5, y: 5, isbn: '9780743273565' },
    { id: 2, title: 'A Brief History of Time', category: 'Science', subcategory: 'Physics', rack: 'B2', floor: 2, x: 10, y: 15, isbn: '9780553380163' },
    { id: 3, title: 'The Hobbit', category: 'Fiction', subcategory: 'Fantasy', rack: 'C3', floor: 1, x: 2, y: 8, isbn: '9780547928227' },
    { id: 4, title: 'Code Complete', category: 'Technology', subcategory: 'Software Engineering', rack: 'D4', floor: 3, x: 15, y: 2, isbn: '9780735619678' },
    { id: 5, title: 'Introduction to Algorithms', category: 'Technology', subcategory: 'Computer Science', rack: 'D4', floor: 3, x: 16, y: 2, isbn: '9780262033848' },
    { id: 6, title: 'Thinking, Fast and Slow', category: 'Psychology', subcategory: 'Behavioral Economics', rack: 'E5', floor: 2, x: 8, y: 12, isbn: '9780374275631' },
    { id: 7, title: '1984', category: 'Fiction', subcategory: 'Classic', rack: 'A1', floor: 1, x: 6, y: 5, isbn: '9780451524935' },
    { id: 8, title: 'To Kill a Mockingbird', category: 'Fiction', subcategory: 'Classic', rack: 'A1', floor: 1, x: 7, y: 5, isbn: '9780060935467' },
    { id: 9, title: 'Dune', category: 'Fiction', subcategory: 'Sci-Fi', rack: 'C3', floor: 1, x: 3, y: 8, isbn: '9780441172719' },
    { id: 10, title: 'Foundation', category: 'Fiction', subcategory: 'Sci-Fi', rack: 'C3', floor: 1, x: 4, y: 8, isbn: '9780553293357' },
    { id: 11, title: 'Cosmos', category: 'Science', subcategory: 'Astronomy', rack: 'B2', floor: 2, x: 11, y: 15, isbn: '9780345331359' },
    { id: 12, title: 'The Selfish Gene', category: 'Science', subcategory: 'Biology', rack: 'B3', floor: 2, x: 12, y: 15, isbn: '9780192860927' },
    { id: 13, title: 'Sapiens: A Brief History of Humankind', category: 'Science', subcategory: 'Anthropology', rack: 'B3', floor: 2, x: 13, y: 15, isbn: '9780062316097' },
    { id: 14, title: 'Astrophysics for People in a Hurry', category: 'Science', subcategory: 'Astronomy', rack: 'B2', floor: 2, x: 14, y: 15, isbn: '9780393609394' },
    { id: 15, title: 'Clean Code', category: 'Technology', subcategory: 'Software Engineering', rack: 'D4', floor: 3, x: 17, y: 2, isbn: '9780132350884' },
    { id: 16, title: 'The Pragmatic Programmer', category: 'Technology', subcategory: 'Software Engineering', rack: 'D4', floor: 3, x: 18, y: 2, isbn: '9780201616224' },
    { id: 17, title: 'Design Patterns', category: 'Technology', subcategory: 'Software Engineering', rack: 'D5', floor: 3, x: 19, y: 2, isbn: '9780201633610' },
    { id: 18, title: 'You Don\'t Know JS', category: 'Technology', subcategory: 'Web Development', rack: 'D5', floor: 3, x: 20, y: 2, isbn: '9781491904244' },
    { id: 19, title: 'Influence: The Psychology of Persuasion', category: 'Psychology', subcategory: 'Social Psychology', rack: 'E5', floor: 2, x: 9, y: 12, isbn: '9780061241895' },
    { id: 20, title: 'Man\'s Search for Meaning', category: 'Psychology', subcategory: 'Logotherapy', rack: 'E6', floor: 2, x: 10, y: 12, isbn: '9780807014295' },
    { id: 21, title: 'Quiet: The Power of Introverts', category: 'Psychology', subcategory: 'Personality', rack: 'E6', floor: 2, x: 11, y: 12, isbn: '9780307352156' },
    { id: 22, title: 'The Power of Habit', category: 'Psychology', subcategory: 'Behavioral', rack: 'E7', floor: 2, x: 12, y: 12, isbn: '9780812981605' }
];

module.exports = {
    query: async (text, params) => {
        if (text.includes('SELECT * FROM books WHERE title ILIKE')) {
            const title = params[0].replace(/%/g, '').toLowerCase();
            return { rows: books.filter(b => b.title.toLowerCase().includes(title)) };
        }
        if (text.includes('SELECT * FROM books WHERE 1=1')) {
            let filtered = [...books];
            if (params.length > 0) {
                // Simplified filter simulation
                filtered = filtered.filter(b => b.category === params[0]);
            }
            return { rows: filtered };
        }
        if (text.includes('SELECT x, y FROM books WHERE id =')) {
            const book = books.find(b => b.id == params[0]);
            return { rows: book ? [book] : [] };
        }
        return { rows: books };
    },
};
