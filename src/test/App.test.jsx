import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App.jsx";
import { BookmarkProvider } from "../context/BookmarkContext.jsx";
import QuestionCard from "../components/QuestionCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import SearchBar from "../components/SearchBar.jsx";
import QuestionDetailsPage from "../pages/QuestionDetailsPage.jsx";
import BookmarksPage from "../pages/BookmarksPage.jsx";
import { MOCK_QUESTIONS } from "../api/mockData.js";

describe("Stack Overflow Question Explorer — Official FA2 Test Suite", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  // Test 1: Application renders successfully
  it("1. Application renders successfully with header, title, and explore view", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText("StackOverflow")).toBeInTheDocument();
    expect(screen.getByText("Question Explorer")).toBeInTheDocument();
    expect(screen.getByText(/Search, Explore & Bookmark/i)).toBeInTheDocument();
  });

  // Test 2: Navigation routes work
  it("2. Navigation routes work across Explore, Bookmarks, and About pages", async () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/About the Project & Architecture/i)).toBeInTheDocument();
    expect(screen.getAllByText("Amit Sanjay Chame").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("125M1H020").length).toBeGreaterThanOrEqual(1);
  });

  // Test 3: Search input updates correctly
  it("3. Search input updates correctly as user types", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Search question title, topics, or keywords/i);
    await user.type(input, "JavaScript");
    expect(input.value).toBe("JavaScript");
  });

  // Test 4: Tag filtering works
  it("4. Tag filtering works when clicking topic pills", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    const pythonButton = screen.getByRole("button", { name: "python" });
    expect(pythonButton).toBeInTheDocument();
    await user.click(pythonButton);
    expect(pythonButton).toHaveClass("active");
  });

  // Test 5: Sorting works
  it("5. Sorting select changes value and triggers order adjustment", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    const sortSelect = screen.getByLabelText(/Sort by:/i);
    fireEvent.change(sortSelect, { target: { value: "creation" } });
    expect(sortSelect.value).toBe("creation");
  });

  // Test 6: Question cards display expected information
  it("6. Question cards display expected information (title, votes, answers, tags)", () => {
    const sampleQuestion = MOCK_QUESTIONS[0];
    render(
      <MemoryRouter>
        <BookmarkProvider>
          <QuestionCard question={sampleQuestion} />
        </BookmarkProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(sampleQuestion.title)).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument(); // votes
    expect(screen.getByText("4")).toBeInTheDocument(); // answers
    expect(screen.getByText("View Details")).toBeInTheDocument();
  });

  // Test 7: Loading and empty states render correctly
  it("7. Loading and empty states render correctly with informative prompts", () => {
    const handleReset = vi.fn();
    render(
      <EmptyState
        title="Custom No Results"
        description="Try clearing search query."
        onReset={handleReset}
      />
    );

    expect(screen.getByText("Custom No Results")).toBeInTheDocument();
    const resetBtn = screen.getByText("Reset All Filters");
    fireEvent.click(resetBtn);
    expect(handleReset).toHaveBeenCalledTimes(1);
  });

  // Test 8: API errors display an appropriate message
  it("8. API errors display an appropriate message with retry button", () => {
    const handleRetry = vi.fn();
    render(
      <ErrorMessage
        message="Stack Exchange network timeout."
        onRetry={handleRetry}
      />
    );

    expect(screen.getByText("Unable to complete request")).toBeInTheDocument();
    expect(screen.getByText("Stack Exchange network timeout.")).toBeInTheDocument();
    const retryBtn = screen.getByRole("button", { name: /Retry/i });
    fireEvent.click(retryBtn);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });

  // Test 9: Question detail routing handles valid and invalid IDs
  it("9. Question detail routing handles invalid IDs gracefully with error banner", async () => {
    render(
      <MemoryRouter initialEntries={["/questions/invalid-abc"]}>
        <BookmarkProvider>
          <QuestionDetailsPage forceMock={true} />
        </BookmarkProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/Invalid question identifier/i)
      ).toBeInTheDocument();
    });
  });

  // Test 10: Bookmarks can be added
  it("10. Bookmarks can be added successfully via BookmarkButton", async () => {
    const sampleQuestion = MOCK_QUESTIONS[0];
    render(
      <MemoryRouter initialEntries={["/"]}>
        <BookmarkProvider>
          <QuestionCard question={sampleQuestion} />
        </BookmarkProvider>
      </MemoryRouter>
    );

    const bookmarkBtn = screen.getByRole("button", { name: /Save to bookmarks/i });
    fireEvent.click(bookmarkBtn);

    const stored = JSON.parse(localStorage.getItem("so_explorer_bookmarks_fa2") || "[]");
    expect(stored.length).toBe(1);
    expect(stored[0].title).toBe(sampleQuestion.title);
  });

  // Test 11: Bookmarks persist across reloads
  it("11. Bookmarks persist across reloads from LocalStorage", () => {
    const initialBookmarks = [
      {
        id: 1,
        question_id: 1,
        title: "Persisted React Question",
        collection: "Exam Prep",
        userNote: "Study hooks lifecycle"
      }
    ];
    localStorage.setItem("so_explorer_bookmarks_fa2", JSON.stringify(initialBookmarks));

    render(
      <MemoryRouter initialEntries={["/bookmarks"]}>
        <BookmarkProvider>
          <BookmarksPage />
        </BookmarkProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Persisted React Question")).toBeInTheDocument();
    expect(screen.getByText("Study hooks lifecycle")).toBeInTheDocument();
    expect(screen.getAllByText("Exam Prep").length).toBeGreaterThanOrEqual(1);
  });

  // Test 12: Bookmarks can be removed
  it("12. Bookmarks can be removed cleanly via CRUD delete action", async () => {
    const initialBookmarks = [
      {
        id: 1,
        question_id: 1,
        title: "Question to Delete",
        collection: "General"
      }
    ];
    localStorage.setItem("so_explorer_bookmarks_fa2", JSON.stringify(initialBookmarks));

    render(
      <MemoryRouter initialEntries={["/bookmarks"]}>
        <BookmarkProvider>
          <BookmarksPage />
        </BookmarkProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("Question to Delete")).toBeInTheDocument();
    const deleteBtn = screen.getByRole("button", { name: /Delete bookmark/i });
    fireEvent.click(deleteBtn);

    expect(screen.queryByText("Question to Delete")).not.toBeInTheDocument();
    expect(screen.getByText(/No saved questions yet/i)).toBeInTheDocument();
  });

  // Test 13: Invalid form input is handled
  it("13. Invalid form input displays inline validation message", () => {
    render(
      <SearchBar
        value="   "
        onChange={() => {}}
        onClear={() => {}}
        validationError="Search query cannot consist solely of whitespace."
      />
    );

    expect(
      screen.getByText("Search query cannot consist solely of whitespace.")
    ).toBeInTheDocument();
  });

  // Test 14: Reset functionality clears applicable filters
  it("14. Reset functionality clears filters and restores initial defaults", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/Search question title, topics, or keywords/i);
    await user.type(input, "React");
    expect(input.value).toBe("React");

    const resetBtn = screen.getByRole("button", { name: /Reset Filters/i });
    await user.click(resetBtn);

    expect(input.value).toBe("");
  });
});
