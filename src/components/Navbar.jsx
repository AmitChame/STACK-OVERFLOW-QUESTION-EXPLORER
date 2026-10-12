import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useBookmarks } from "../context/BookmarkContext.jsx";
import { BookOpen, Bookmark, Info, Menu, X, Layers, Flame } from "lucide-react";

export function Navbar({ forceMock, setForceMock }) {
  const { bookmarks } = useBookmarks();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar-header">
      <div className="nav-container">
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-icon">
            <Layers size={22} className="logo-svg" />
          </div>
          <div className="brand-text">
            <span className="brand-title">StackOverflow</span>
            <span className="brand-subtitle">Question Explorer</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <BookOpen size={17} />
            <span>Explore</span>
          </NavLink>

          <NavLink
            to="/bookmarks"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <Bookmark size={17} />
            <span>Bookmarks</span>
            {bookmarks.length > 0 && (
              <span className="badge-count" data-testid="bookmark-badge">
                {bookmarks.length}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <Info size={17} />
            <span>About</span>
          </NavLink>

          {/* Mode Switcher Toggle */}
          <button
            type="button"
            className={`mode-toggle-btn ${forceMock ? "mock-active" : "live-active"}`}
            onClick={() => setForceMock((prev) => !prev)}
            title="Toggle between Live Stack Exchange API and Local Mock Dataset"
          >
            <Flame size={14} />
            <span>{forceMock ? "Demo / Mock Mode" : "Live API Mode"}</span>
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <BookOpen size={18} />
            <span>Explore Questions</span>
          </NavLink>

          <NavLink
            to="/bookmarks"
            className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Bookmark size={18} />
            <span>Saved Bookmarks ({bookmarks.length})</span>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Info size={18} />
            <span>About Project & Student</span>
          </NavLink>

          <button
            type="button"
            className="mobile-mode-btn"
            onClick={() => {
              setForceMock((prev) => !prev);
              setMobileMenuOpen(false);
            }}
          >
            <Flame size={16} />
            <span>Switch to {forceMock ? "Live API" : "Mock / Demo Mode"}</span>
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
