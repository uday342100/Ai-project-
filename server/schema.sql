
CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    subcategory VARCHAR(100),
    rack VARCHAR(50),
    floor INT,
    x INT,
    y INT,
    isbn VARCHAR(20),
    image_url TEXT
);

-- Seed data
INSERT INTO books (title, category, subcategory, rack, floor, x, y, isbn) VALUES
('The Great Gatsby', 'Fiction', 'Classic', 'A1', 1, 5, 5, '9780743273565'),
('A Brief History of Time', 'Science', 'Physics', 'B2', 2, 10, 15, '9780553380163'),
('The Hobbit', 'Fiction', 'Fantasy', 'C3', 1, 2, 8, '9780547928227'),
('Code Complete', 'Technology', 'Software Engineering', 'D4', 3, 15, 2, '9780735619678'),
('Introduction to Algorithms', 'Technology', 'Computer Science', 'D4', 3, 16, 2, '9780262033848'),
('Thinking, Fast and Slow', 'Psychology', 'Behavioral Economics', 'E5', 2, 8, 12, '9780374275631'),
('1984', 'Fiction', 'Classic', 'A1', 1, 6, 5, '9780451524935'),
('To Kill a Mockingbird', 'Fiction', 'Classic', 'A1', 1, 7, 5, '9780060935467'),
('Dune', 'Fiction', 'Sci-Fi', 'C3', 1, 3, 8, '9780441172719'),
('Foundation', 'Fiction', 'Sci-Fi', 'C3', 1, 4, 8, '9780553293357'),
('Cosmos', 'Science', 'Astronomy', 'B2', 2, 11, 15, '9780345331359'),
('The Selfish Gene', 'Science', 'Biology', 'B3', 2, 12, 15, '9780192860927'),
('Sapiens: A Brief History of Humankind', 'Science', 'Anthropology', 'B3', 2, 13, 15, '9780062316097'),
('Astrophysics for People in a Hurry', 'Science', 'Astronomy', 'B2', 2, 14, 15, '9780393609394'),
('Clean Code', 'Technology', 'Software Engineering', 'D4', 3, 17, 2, '9780132350884'),
('The Pragmatic Programmer', 'Technology', 'Software Engineering', 'D4', 3, 18, 2, '9780201616224'),
('Design Patterns', 'Technology', 'Software Engineering', 'D5', 3, 19, 2, '9780201633610'),
('You Don''t Know JS', 'Technology', 'Web Development', 'D5', 3, 20, 2, '9781491904244'),
('Influence: The Psychology of Persuasion', 'Psychology', 'Social Psychology', 'E5', 2, 9, 12, '9780061241895'),
('Man''s Search for Meaning', 'Psychology', 'Logotherapy', 'E6', 2, 10, 12, '9780807014295'),
('Quiet: The Power of Introverts', 'Psychology', 'Personality', 'E6', 2, 11, 12, '9780307352156'),
('The Power of Habit', 'Psychology', 'Behavioral', 'E7', 2, 12, 12, '9780812981605');
