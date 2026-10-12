import { useState, useMemo } from "react";
import SearchBar from "../components/SearchBar.jsx";
import TagFilter from "../components/TagFilter.jsx";
import SortControls from "../components/SortControls.jsx";
import QuestionList from "../components/QuestionList.jsx";
import Pagination from "../components/Pagination.jsx";
import { useQuestions } from "../hooks/useQuestions.js";
import { useDebounce } from "../hooks/useDebounce.js";
import { Sparkles, X, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export function HomePage({ forceMock }) {
  // Search state
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 400);

  // Filter & sort state
  const [selectedTag, setSelectedTag] = useState("All");
  const [sort, setSort] = useState("votes");
  const [minAnswers, setMinAnswers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Inline selected question (FA1 compatibility feature)
  const [inlineSelectedQuestion, setInlineSelectedQuestion] = useState(null);

  // Form input validation for search query
  const validationError = useMemo(() => {
    if (searchInput.length > 0 && searchInput.trim().length === 0) {
      return "Search query cannot consist solely of whitespace.";
    }
    return null;
  }, [searchInput]);

  // Fetch questions using custom hook
  const {
    questions,
    loading,
    error,
    hasMore,
    quotaRemaining,
    isFallback,
    fallbackReason,
    refetch
  } = useQuestions({
    query: debouncedSearch.trim(),
    tag: selectedTag,
    sort,
    page: currentPage,
    pageSize: 10,
    minAnswers,
    forceMock
  });

  // Handle filter changes (resets page to 1)
  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1);
    setInlineSelectedQuestion(null);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setCurrentPage(1);
  };

  const handleMinAnswersChange = (val) => {
    setMinAnswers(val);
    setCurrentPage(1);
  };

  // Reset all filters back to initial state (Satisfies FR6 / FA1 reset requirement)
  const handleReset = () => {
    setSearchInput("");
    setSelectedTag("All");
    setSort("votes");
    setMinAnswers(0);
    setCurrentPage(1);
    setInlineSelectedQuestion(null);
  };

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-tag">
            <Sparkles size={14} className="sparkle-icon" />
            <span>Stack Overflow Explorer • FA2 Mini Project</span>
          </div>
          <h1 className="hero-title">
            Search, Explore & Bookmark <span className="highlight-text">Programming Questions</span>
          </h1>
          <p className="hero-subtitle">
            Powered by the public Stack Exchange REST API. Browse top technical queries,
            filter by topics, inspect verified community answers, and manage offline bookmarks.
          </p>
        </div>
      </section>

      {/* Search and Filters Card */}
      <section className="search-filter-card">
        <SearchBar
          value={searchInput}
          onChange={(val) => {
            setSearchInput(val);
            setCurrentPage(1);
          }}
          onClear={() => {
            setSearchInput("");
            setCurrentPage(1);
          }}
          validationError={validationError}
        />

        <TagFilter
          selectedTag={selectedTag}
          onSelectTag={handleTagChange}
        />

        <SortControls
          sort={sort}
          onSortChange={handleSortChange}
          minAnswers={minAnswers}
          onMinAnswersChange={handleMinAnswersChange}
          onReset={handleReset}
          quotaRemaining={quotaRemaining}
          isFallback={isFallback}
        />

        {isFallback && fallbackReason && (
          <div className="fallback-alert-banner">
            <small>ℹ️ Notice: {fallbackReason}. Displaying verified local dataset.</small>
          </div>
        )}
      </section>

      {/* FA1 Legacy Inline Details Box (when clicked inline or on small views) */}
      {inlineSelectedQuestion && (
        <section className="inline-details-box" data-testid="inline-details-box">
          <div className="inline-details-header">
            <h3>Quick Preview: {inlineSelectedQuestion.title}</h3>
            <button
              type="button"
              className="close-inline-btn"
              onClick={() => setInlineSelectedQuestion(null)}
              aria-label="Close preview"
            >
              <X size={18} />
            </button>
          </div>
          <div className="inline-details-body">
            <p><strong>Category / Tag:</strong> {inlineSelectedQuestion.category || inlineSelectedQuestion.tags?.join(", ")}</p>
            <p><strong>Score / Votes:</strong> {inlineSelectedQuestion.votes ?? inlineSelectedQuestion.score ?? 0}</p>
            <p><strong>Answers:</strong> {inlineSelectedQuestion.answers ?? inlineSelectedQuestion.answer_count ?? 0}</p>
            <p><strong>Summary:</strong> {inlineSelectedQuestion.description || inlineSelectedQuestion.body?.replace(/<[^>]+>/g, "").slice(0, 200)}</p>
            <div className="inline-details-footer">
              <Link
                to={`/questions/${inlineSelectedQuestion.id || inlineSelectedQuestion.question_id}`}
                className="btn-full-details"
              >
                Open Full Question & Answers Page
              </Link>
              {inlineSelectedQuestion.link && (
                <a
                  href={inlineSelectedQuestion.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-external-so"
                >
                  <ExternalLink size={13} />
                  <span>Stack Overflow</span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Question Results List */}
      <section className="results-section">
        <div className="results-header-row">
          <h2 className="results-heading">
            {selectedTag === "All" ? "All Questions" : `${selectedTag} Questions`}
            {searchInput && ` matching "${searchInput}"`}
          </h2>
          <span className="results-count-badge">
            {questions.length} questions loaded
          </span>
        </div>

        <QuestionList
          questions={questions}
          loading={loading}
          error={error}
          onRetry={refetch}
          onReset={handleReset}
          onViewQuestion={(q) => setInlineSelectedQuestion(q)}
        />

        {!loading && !error && questions.length > 0 && (
          <Pagination
            currentPage={currentPage}
            hasMore={hasMore}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 300, behavior: "smooth" });
            }}
            pageSize={10}
          />
        )}
      </section>
    </div>
  );
}

export default HomePage;
