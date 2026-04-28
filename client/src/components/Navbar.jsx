
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Map, 
  LayoutGrid, 
  Info, 
  Settings, 
  User, 
  Menu, 
  X,
  BookOpen,
  Bookmark,
  ShoppingCart
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [navSearch, setNavSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch('');
    }
  };

  const navItems = [
    { name: 'Home', path: '/home', icon: <Home size={18} /> },
    { name: 'Search', path: '/search', icon: <Search size={18} /> },
    { name: 'Map', path: '/map', icon: <Map size={18} /> },
    { name: 'Categories', path: '/categories', icon: <LayoutGrid size={18} /> }
  ];

  const secondaryItems = [
    { name: 'About', path: '/about', icon: <Info size={18} /> },
    { name: 'Admin', path: '/admin', icon: <Settings size={18} /> },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Logo */}
        <NavLink to="/home" className="nav-logo">
          <BookOpen color="var(--primary)" size={28} strokeWidth={2.5} />
          <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
            BookNavigator
          </span>
        </NavLink>

        {/* Center: Search Bar (Desktop) */}
        <form className="nav-search-container desktop-only" onSubmit={handleSearch}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search for books, authors, genres..." 
            style={{ paddingLeft: '40px', height: '44px', fontSize: '0.9rem' }}
            value={navSearch}
            onChange={(e) => setNavSearch(e.target.value)}
          />
        </form>

        {/* Right: Menu & Actions */}
        <div className="nav-actions">
          <div className="nav-menu desktop-only">
            {navItems.map((item) => (
              <NavLink 
                key={item.name} 
                to={item.path} 
                className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div style={{ width: '1px', height: '24px', background: 'var(--border)', margin: '0 0.5rem' }} className="desktop-only" />

          <NavLink to="/saved" className="icon-btn desktop-only" title="Saved Books" style={({isActive}) => ({ color: isActive ? 'var(--primary)' : 'inherit' })}>
            <Bookmark size={20} />
          </NavLink>
          
          <div style={{ position: 'relative' }}>
            <button className="icon-btn" title="Profile" onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <User size={20} />
            </button>
            {showProfileMenu && (
              <div style={{
                position: 'absolute',
                top: '120%',
                right: '0',
                background: '#fff',
                border: '1px solid var(--surface-alt)',
                borderRadius: '12px',
                padding: '1rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                minWidth: '200px',
                zIndex: 100,
                animation: 'fadeIn 0.2s ease-out'
              }}>
                <div style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--surface-alt)', marginBottom: '0.75rem' }}>
                  <p style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--text)', marginBottom: '0.2rem' }}>Student / User</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>user@library.edu</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <button style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', color: 'var(--text)', fontSize: '0.85rem', fontWeight: '600' }} onMouseOver={e => e.target.style.background='var(--surface-alt)'} onMouseOut={e => e.target.style.background='none'}>My Account</button>
                  <button style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', color: 'var(--text)', fontSize: '0.85rem', fontWeight: '600' }} onMouseOver={e => e.target.style.background='var(--surface-alt)'} onMouseOut={e => e.target.style.background='none'}>Library Card</button>
                  <button style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', color: 'var(--text)', fontSize: '0.85rem', fontWeight: '600' }} onMouseOver={e => e.target.style.background='var(--surface-alt)'} onMouseOut={e => e.target.style.background='none'}>Preferences</button>
                  <button style={{ background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', color: '#ef4444', fontSize: '0.85rem', fontWeight: '700', marginTop: '0.5rem' }} onMouseOver={e => e.target.style.background='#fef2f2'} onMouseOut={e => e.target.style.background='none'}>Sign Out</button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div style={{ marginBottom: '2rem' }}>
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Search..." 
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
            />
          </form>
        </div>
        {[...navItems, ...secondaryItems].map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            className={({ isActive }) => isActive ? "mobile-link active" : "mobile-link"}
            onClick={() => setIsOpen(false)}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
