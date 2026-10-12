import { Bookmark } from "lucide-react";
import { useBookmarks } from "../context/BookmarkContext.jsx";

export function BookmarkButton({ question, showLabel = false, className = "" }) {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const qId = question.id || question.question_id;
  const bookmarked = isBookmarked(qId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(question);
  };

  return (
    <button
      type="button"
      className={`bookmark-toggle-btn ${bookmarked ? "bookmarked" : ""} ${className}`}
      onClick={handleClick}
      aria-label={bookmarked ? "Remove from bookmarks" : "Save to bookmarks"}
      title={bookmarked ? "Remove from bookmarks" : "Save question to bookmarks"}
    >
      <Bookmark size={16} className={`bookmark-icon ${bookmarked ? "filled" : ""}`} />
      {showLabel && <span>{bookmarked ? "Bookmarked" : "Save Bookmark"}</span>}
    </button>
  );
}

export default BookmarkButton;
