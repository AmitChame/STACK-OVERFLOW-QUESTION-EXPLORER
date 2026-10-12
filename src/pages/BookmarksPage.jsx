import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useBookmarks } from "../context/BookmarkContext.jsx";
import {
  Bookmark,
  Trash2,
  Edit3,
  Search,
  ExternalLink,
  BookOpen,
  Calendar,
  Tag,
  Save,
  X,
  PlusCircle,
  Folder
} from "lucide-react";

export function BookmarksPage() {
  const { bookmarks, removeBookmark, updateBookmark, clearAllBookmarks } = useBookmarks();

  // Search within saved bookmarks
  const [bookmarkSearch, setBookmarkSearch] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("All");

  // Editing state
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState("");
  const [editCollection, setEditCollection] = useState("");
  const [editError, setEditError] = useState("");

  // Unique collections
  const collections = useMemo(() => {
    const list = new Set(bookmarks.map((b) => b.collection || "General"));
    return ["All", ...Array.from(list)];
  }, [bookmarks]);

  // Filtered bookmarks
  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter((b) => {
      const matchesSearch =
        b.title.toLowerCase().includes(bookmarkSearch.toLowerCase()) ||
        (b.userNote && b.userNote.toLowerCase().includes(bookmarkSearch.toLowerCase())) ||
        (b.tags && b.tags.some((t) => t.toLowerCase().includes(bookmarkSearch.toLowerCase())));

      const matchesCollection =
        selectedCollection === "All" || (b.collection || "General") === selectedCollection;

      return matchesSearch && matchesCollection;
    });
  }, [bookmarks, bookmarkSearch, selectedCollection]);

  const handleStartEdit = (item) => {
    setEditingId(item.id || item.question_id);
    setEditNote(item.userNote || "");
    setEditCollection(item.collection || "General");
    setEditError("");
  };

  const handleSaveEdit = (id) => {
    if (editNote.length > 300) {
      setEditError("Notes cannot exceed 300 characters.");
      return;
    }
    updateBookmark(id, {
      userNote: editNote.trim(),
      collection: editCollection.trim() || "General"
    });
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditError("");
  };

  return (
    <div className="bookmarks-page-container" data-testid="bookmarks-page">
      <header className="bookmarks-header">
        <div className="bookmarks-title-row">
          <div className="bookmarks-title-group">
            <Bookmark size={28} className="bookmarks-title-icon" />
            <div>
              <h1 className="bookmarks-title">Saved Questions & Bookmarks</h1>
              <p className="bookmarks-subtitle">
                CRUD Bookmark Manager stored locally in your browser (LocalStorage).
                Add custom notes, organize into collections, and track reference questions.
              </p>
            </div>
          </div>

          {bookmarks.length > 0 && (
            <button
              type="button"
              className="clear-all-btn"
              onClick={() => {
                if (window.confirm("Are you sure you want to clear all saved bookmarks?")) {
                  clearAllBookmarks();
                }
              }}
            >
              <Trash2 size={15} />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {bookmarks.length > 0 && (
          <div className="bookmarks-filter-toolbar">
            <div className="bookmarks-search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search within your saved bookmarks or notes..."
                value={bookmarkSearch}
                onChange={(e) => setBookmarkSearch(e.target.value)}
                className="bookmark-search-input"
              />
            </div>

            <div className="collection-filter-group">
              <Folder size={15} />
              <span className="collection-label">Collection:</span>
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="collection-select"
              >
                {collections.map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </header>

      {/* Bookmarks List or Empty State */}
      {bookmarks.length === 0 ? (
        <div className="empty-bookmarks-card" data-testid="empty-bookmarks">
          <Bookmark size={52} className="empty-bookmark-svg" />
          <h2>No saved questions yet</h2>
          <p>
            Explore questions from Stack Overflow and click the <strong>Save Bookmark</strong> icon
            to organize questions, add revision notes, and prepare for interviews.
          </p>
          <Link to="/" className="btn-explore-now">
            <BookOpen size={16} />
            <span>Explore Questions Catalog</span>
          </Link>
        </div>
      ) : filteredBookmarks.length === 0 ? (
        <div className="empty-bookmarks-card">
          <Search size={40} className="empty-bookmark-svg" />
          <h3>No matching bookmarks found</h3>
          <p>Try clearing your search query or switching the collection filter.</p>
          <button
            type="button"
            className="btn-explore-now"
            onClick={() => {
              setBookmarkSearch("");
              setSelectedCollection("All");
            }}
          >
            Clear Bookmark Filter
          </button>
        </div>
      ) : (
        <div className="bookmarks-grid" data-testid="bookmarks-list">
          {filteredBookmarks.map((item) => {
            const qId = item.id || item.question_id;
            const isEditing = editingId === qId;

            return (
              <div key={qId} className="bookmark-card-item" data-testid={`bookmark-item-${qId}`}>
                <div className="bookmark-card-top">
                  <div className="bookmark-collection-badge">
                    <Folder size={12} />
                    <span>{item.collection || "General"}</span>
                  </div>

                  <div className="bookmark-actions">
                    <button
                      type="button"
                      className="bookmark-action-btn edit"
                      onClick={() => handleStartEdit(item)}
                      title="Edit note or collection"
                      aria-label="Edit bookmark note"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      type="button"
                      className="bookmark-action-btn delete"
                      onClick={() => removeBookmark(qId)}
                      title="Remove bookmark"
                      aria-label="Delete bookmark"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <h3 className="bookmark-question-title">
                  <Link to={`/questions/${qId}`}>{item.title}</Link>
                </h3>

                <div className="bookmark-stats-strip">
                  <span>Votes: <strong>{item.votes ?? item.score ?? 0}</strong></span>
                  <span>Answers: <strong>{item.answers ?? item.answer_count ?? 0}</strong></span>
                  {item.bookmarkedAt && (
                    <span className="bookmark-saved-date">
                      <Calendar size={12} />
                      {new Date(item.bookmarkedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Edit Form or Display Notes */}
                {isEditing ? (
                  <div className="bookmark-edit-form" data-testid="bookmark-edit-form">
                    <label className="edit-form-label">Collection / Folder:</label>
                    <input
                      type="text"
                      value={editCollection}
                      onChange={(e) => setEditCollection(e.target.value)}
                      placeholder="e.g. React Prep, JavaScript, Interview"
                      className="edit-input-field"
                    />

                    <label className="edit-form-label">Personal Note:</label>
                    <textarea
                      rows={3}
                      value={editNote}
                      onChange={(e) => setEditNote(e.target.value)}
                      placeholder="Add personal notes, solution insights, or interview points..."
                      className="edit-textarea-field"
                    />

                    {editError && <p className="edit-validation-error">{editError}</p>}

                    <div className="edit-form-btn-row">
                      <button
                        type="button"
                        className="btn-save-edit"
                        onClick={() => handleSaveEdit(qId)}
                      >
                        <Save size={14} />
                        <span>Save Note</span>
                      </button>
                      <button
                        type="button"
                        className="btn-cancel-edit"
                        onClick={handleCancelEdit}
                      >
                        <X size={14} />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bookmark-note-display">
                    {item.userNote ? (
                      <p className="note-text">
                        <strong>My Note:</strong> {item.userNote}
                      </p>
                    ) : (
                      <button
                        type="button"
                        className="btn-add-note-prompt"
                        onClick={() => handleStartEdit(item)}
                      >
                        <PlusCircle size={13} />
                        <span>Add personal study note...</span>
                      </button>
                    )}
                  </div>
                )}

                <div className="bookmark-card-footer">
                  <Link to={`/questions/${qId}`} className="bookmark-view-link">
                    Open Full Details & Answers
                  </Link>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bookmark-so-link"
                      title="Open on Stack Overflow"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BookmarksPage;
