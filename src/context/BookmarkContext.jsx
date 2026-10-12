import { createContext, useContext, useState, useEffect, useCallback } from "react";

const BookmarkContext = createContext();
const STORAGE_KEY = "so_explorer_bookmarks_fa2";

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Failed to load bookmarks from LocalStorage:", err);
      return [];
    }
  });

  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((curr) => (curr && curr.message === message ? null : curr));
    }, 3200);
  }, []);

  // Save to LocalStorage whenever bookmarks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (err) {
      console.error("Failed to save bookmarks to LocalStorage:", err);
      showToast("Storage quota exceeded or unavailable", "error");
    }
  }, [bookmarks, showToast]);

  // CREATE: Add bookmark with optional note and tag
  const addBookmark = useCallback(
    (question, note = "", collection = "General") => {
      const qId = question.id || question.question_id;
      setBookmarks((prev) => {
        const exists = prev.some((b) => (b.id || b.question_id) === qId);
        if (exists) {
          showToast("Question is already in bookmarks", "info");
          return prev;
        }
        const newBookmark = {
          ...question,
          id: qId,
          question_id: qId,
          userNote: note.trim(),
          collection: collection.trim() || "General",
          bookmarkedAt: new Date().toISOString()
        };
        showToast("Added to bookmarks!", "success");
        return [newBookmark, ...prev];
      });
    },
    [showToast]
  );

  // UPDATE: Edit note or collection for existing bookmark
  const updateBookmark = useCallback(
    (id, updatedFields) => {
      setBookmarks((prev) => {
        const numericId = Number(id);
        const index = prev.findIndex((b) => (b.id || b.question_id) === numericId);
        if (index === -1) {
          showToast("Bookmark not found", "error");
          return prev;
        }
        const updatedList = [...prev];
        updatedList[index] = {
          ...updatedList[index],
          ...updatedFields,
          lastModified: new Date().toISOString()
        };
        showToast("Bookmark updated successfully!", "success");
        return updatedList;
      });
    },
    [showToast]
  );

  // DELETE: Remove bookmark
  const removeBookmark = useCallback(
    (id) => {
      const numericId = Number(id);
      setBookmarks((prev) => {
        const next = prev.filter((b) => (b.id || b.question_id) !== numericId);
        showToast("Removed from bookmarks", "info");
        return next;
      });
    },
    [showToast]
  );

  // TOGGLE helper
  const toggleBookmark = useCallback(
    (question) => {
      const qId = question.id || question.question_id;
      const isSaved = bookmarks.some((b) => (b.id || b.question_id) === qId);
      if (isSaved) {
        removeBookmark(qId);
      } else {
        addBookmark(question);
      }
    },
    [bookmarks, addBookmark, removeBookmark]
  );

  // READ helper: check if bookmarked
  const isBookmarked = useCallback(
    (id) => {
      const numericId = Number(id);
      return bookmarks.some((b) => (b.id || b.question_id) === numericId);
    },
    [bookmarks]
  );

  // Bulk clear bookmarks
  const clearAllBookmarks = useCallback(() => {
    setBookmarks([]);
    showToast("All bookmarks cleared", "info");
  }, [showToast]);

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        addBookmark,
        updateBookmark,
        removeBookmark,
        toggleBookmark,
        isBookmarked,
        clearAllBookmarks,
        toast,
        dismissToast: () => setToast(null)
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
}
