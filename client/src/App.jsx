
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, ChevronRight, Navigation, MapPin, ArrowRight, BookOpen, FlaskConical, Cpu, Brain, Book } from 'lucide-react';
import Navbar from './components/Navbar';
import BookCard from './components/BookCard';
import MapView from './components/MapView';
import './App.css';
import heroBooksHorizontal from './assets/hero_books_horizontal.png';

const API_BASE = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="app-container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <div className="glass-panel" style={{ padding: '4rem', background: 'var(--surface-alt)', border: 'none' }}>
        <img
          src={heroBooksHorizontal}
          alt="Hand holding a stack of books"
          style={{ width: '100%', maxWidth: '800px', height: '160px', objectFit: 'cover', objectPosition: 'center', marginBottom: '3rem', display: 'block', margin: '0 auto 3rem auto', borderRadius: '16px', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }}
        />
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Welcome to BookNavigator</h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          Discover a smarter way to find your books with our interactive 2D map and real-time pathfinding navigation.
        </p>
        <button
          className="button-primary"
          onClick={() => navigate('/search')}
          style={{ padding: '1rem 2.5rem', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}
        >
          EXPLORE MAP & SEARCH <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

const CategoriesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { name: 'Fiction', icon: <Book size={48} strokeWidth={1.5} /> },
    { name: 'Science', icon: <FlaskConical size={48} strokeWidth={1.5} /> },
    { name: 'Technology', icon: <Cpu size={48} strokeWidth={1.5} /> },
    { name: 'Psychology', icon: <Brain size={48} strokeWidth={1.5} /> }
  ];

  const handleCategoryClick = async (categoryName) => {
    setSelectedCategory(categoryName);
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/books/filter?category=${categoryName}`);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div style={{ padding: '3rem 2rem', marginBottom: '2rem', textAlign: 'center', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: "'Playfair Display', serif", marginBottom: '3rem' }}>Browse Categories</h2>

        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '5rem' }}>
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.name)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                cursor: 'pointer',
                color: selectedCategory === cat.name ? '#dc2626' : 'var(--text)',
                transition: 'transform 0.2s, color 0.2s',
                transform: selectedCategory === cat.name ? 'scale(1.1)' : 'scale(1)'
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = '#dc2626'; e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = selectedCategory === cat.name ? '#dc2626' : 'var(--text)'; e.currentTarget.style.transform = selectedCategory === cat.name ? 'scale(1.1)' : 'scale(1)'; }}
            >
              <div style={{ color: '#dc2626' }}>
                {cat.icon}
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <div className="fade-in">
          <h3 style={{ fontSize: '1.8rem', fontWeight: '700', fontFamily: "'Playfair Display', serif", marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '2px solid var(--surface-alt)' }}>
            {selectedCategory} Books
          </h3>
          {loading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading books...</div>
          ) : books.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '3rem' }}>
              {books.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  onShowPath={(b) => navigate(`/search?q=${encodeURIComponent(b.title)}`)}
                />
              ))}
            </div>
          ) : (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>No books found in this category.</div>
          )}
        </div>
      )}
    </div>
  );
};
const AboutPage = () => <div className="app-container"><div className="glass-panel"><h2>About the Navigator</h2><p>Our smart system helps you navigate complex library layouts with ease.</p></div></div>;
const AdminPage = () => <div className="app-container"><div className="glass-panel"><h2>Library Management</h2><p>Authorized access only for coordinate management.</p></div></div>;

const SavedPage = () => {
  const [savedBooks, setSavedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSaved = () => {
      const books = JSON.parse(localStorage.getItem('savedBooks')) || [];
      setSavedBooks(books);
    };
    loadSaved();
    window.addEventListener('storage', loadSaved);
    return () => window.removeEventListener('storage', loadSaved);
  }, []);

  return (
    <div className="app-container">
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: "'Playfair Display', serif", marginBottom: '1rem' }}>Saved Books</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Your personal reading list and bookmarked items.</p>
      </div>

      {savedBooks.length === 0 ? (
        <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          You haven't saved any books yet. Explore the map and search to find books you like!
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '3rem' }}>
          {savedBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onShowPath={(b) => navigate(`/search?q=${encodeURIComponent(b.title)}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const MapPage = () => {
  const [obstacles, setObstacles] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const res = await axios.get(`${API_BASE}/layout`);
        setObstacles(res.data.grid);
        setRooms(res.data.rooms);
      } catch (err) {
        console.error("Error fetching layout:", err);
      }
    };
    fetchLayout();
  }, []);

  return (
    <div className="app-container">
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: "'Playfair Display', serif", marginBottom: '1rem' }}>Library Map Layout</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Explore the complete layout of our library rooms and bookshelves.</p>
      </div>
      <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <MapView path={[]} obstacles={obstacles} rooms={rooms} goal={null} />
      </div>
    </div>
  );
};

function SearchAndMap() {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState('');
  const [algorithm, setAlgorithm] = useState('astar');
  const [currentPath, setCurrentPath] = useState([]);
  const [obstacles, setObstacles] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) handleNavSearch(query);
    else fetchBooks();
  }, [query]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/books`);
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNavSearch = async (q) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/books/search?title=${q}`);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (cat) => {
    setCategory(cat);
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/books/filter?category=${cat}`);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPath = async (book) => {
    try {
      setSelectedBook(book);
      const res = await axios.post(`${API_BASE}/path`, {
        book_id: book.id,
        algorithm: algorithm
      });
      setCurrentPath(res.data.path);
      setObstacles(res.data.grid);
      setRooms(res.data.rooms);

      const mapSection = document.getElementById('map-section');
      if (mapSection) {
        window.scrollTo({
          top: mapSection.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    } catch (err) {
      console.error("Error calculating path:", err);
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div style={{ position: 'sticky', top: '120px' }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: '800', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>NAVIGATION SETTINGS</h3>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '700', display: 'block', marginBottom: '0.6rem' }}>Path Algorithm</label>
                <select
                  className="input-field"
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value)}
                  style={{ padding: '0.5rem', height: '44px', fontSize: '0.9rem' }}
                >
                  <option value="astar">A* Search (Optimal)</option>
                </select>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '0.8rem', fontWeight: '800', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>BOOKS CATEGORIES</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {['Fiction', 'Science', 'Technology', 'Psychology'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleFilter(cat)}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', padding: '0.75rem 0',
                      color: category === cat ? 'var(--primary)' : 'var(--text)',
                      fontWeight: category === cat ? '800' : '600', cursor: 'pointer', fontSize: '0.95rem', borderBottom: '1px solid var(--surface-alt)'
                    }}
                  >
                    {cat}
                    <ChevronRight size={16} opacity={category === cat ? 1 : 0.3} />
                  </button>
                ))}
                {category && (
                  <button onClick={() => { setCategory(''); fetchBooks(); }} style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--primary)', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '800', textAlign: 'left' }}>
                    RESET ALL FILTERS
                  </button>
                )}
              </div>
            </div>
          </div>
        </aside>

        <main style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
          <section id="results-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', borderBottom: '2px solid var(--surface-alt)', paddingBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: "'Playfair Display', serif", marginBottom: '0.5rem' }}>
                  {query ? `Results: "${query}"` : (category || 'Library Shelves')}
                </h2>
                <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Select a book to start navigation</p>
              </div>
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '700' }}>{books.length} {books.length === 1 ? 'found' : 'results'}</span>
            </div>

            {loading ? (
              <div style={{ padding: '8rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.2rem' }}>Loading bookshelf...</div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '3rem' }}>
                {books.map(book => (
                  <BookCard key={book.id} book={book} onShowPath={fetchPath} />
                ))}
              </div>
            )}
          </section>

          <section id="map-section" style={{ paddingTop: '2rem' }}>
            <MapView
              path={currentPath}
              obstacles={obstacles}
              rooms={rooms}
              goal={selectedBook ? { x: selectedBook.x, y: selectedBook.y } : null}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: '100vh', background: '#FFFFFF' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/search" element={<SearchAndMap />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
