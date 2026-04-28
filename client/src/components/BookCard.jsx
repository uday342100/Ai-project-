
import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Bookmark } from 'lucide-react';

const BookCard = ({ book, onShowPath }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    if (savedBooks.find(b => b.id === book.id)) {
      setIsSaved(true);
    }
  }, [book.id]);

  const handleSave = (e) => {
    e.stopPropagation();
    let savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || [];
    if (isSaved) {
      savedBooks = savedBooks.filter(b => b.id !== book.id);
      setIsSaved(false);
    } else {
      savedBooks.push(book);
      setIsSaved(true);
    }
    localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="book-card animate-fade-in" style={{ padding: '0.5rem', position: 'relative' }}>
      <button 
        onClick={handleSave}
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          background: 'rgba(255, 255, 255, 0.9)',
          border: 'none',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          boxShadow: 'var(--shadow)',
          color: isSaved ? 'var(--primary)' : 'var(--text-muted)'
        }}
        title={isSaved ? "Remove from Saved" : "Save Book"}
      >
        <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
      </button>

      <div style={{ position: 'relative' }}>
        <img
          src={book.image_url || `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg?default=false`}
          alt={book.title}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/150x200?text=No+Cover'; }}
        />
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          background: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '0.7rem',
          fontWeight: '800',
          boxShadow: 'var(--shadow)',
          color: 'var(--primary)'
        }}>
          FL {book.floor}
        </div>
      </div>

      <div style={{ marginTop: '0.5rem' }}>
        <h3 title={book.title} style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: '2.5rem'
        }}>
          {book.title}
        </h3>
        <p className="author">{book.subcategory}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <MapPin size={14} color="var(--primary)" />
          <span>Rack {book.rack}</span>
        </div>
        {book.distance !== undefined && (
          <span style={{ fontWeight: '700', color: 'var(--primary)' }}>
            {book.distance} steps
          </span>
        )}
      </div>

      <button
        className="button-primary"
        onClick={() => onShowPath(book)}
        style={{
          width: '100%',
          marginTop: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}
      >
        <Navigation size={14} strokeWidth={3} />
        NAVIGATE
      </button>
    </div>
  );
};

export default BookCard;
