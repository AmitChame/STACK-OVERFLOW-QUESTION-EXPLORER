import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ currentPage, hasMore, onPageChange, totalItems, pageSize = 10 }) {
  const isFirstPage = currentPage === 1;

  return (
    <nav className="pagination-wrapper" aria-label="Question list pagination">
      <div className="pagination-info">
        <span>Page <strong>{currentPage}</strong></span>
        {totalItems ? (
          <span> • Showing up to {pageSize} items</span>
        ) : null}
      </div>

      <div className="pagination-controls">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirstPage}
          className="pagination-btn prev-btn"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>

        <span className="current-page-indicator" aria-current="page">
          {currentPage}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasMore}
          className="pagination-btn next-btn"
          aria-label="Next page"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
}

export default Pagination;
