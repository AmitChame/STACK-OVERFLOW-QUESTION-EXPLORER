import { RotateCcw, ArrowUpDown, Filter } from "lucide-react";

export function SortControls({
  sort,
  onSortChange,
  minAnswers,
  onMinAnswersChange,
  onReset,
  quotaRemaining,
  isFallback
}) {
  return (
    <div className="controls-toolbar">
      <div className="controls-left">
        {/* Sort Select */}
        <div className="control-group">
          <label htmlFor="sort-select" className="control-label">
            <ArrowUpDown size={14} />
            <span>Sort by:</span>
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="control-select"
          >
            <option value="votes">Highest Votes / Score</option>
            <option value="creation">Recently Created</option>
            <option value="activity">Recently Active</option>
          </select>
        </div>

        {/* Min Answers Filter */}
        <div className="control-group">
          <label htmlFor="min-answers" className="control-label">
            <Filter size={14} />
            <span>Min Answers:</span>
          </label>
          <select
            id="min-answers"
            value={minAnswers}
            onChange={(e) => onMinAnswersChange(Number(e.target.value))}
            className="control-select"
          >
            <option value={0}>Any (0+)</option>
            <option value={1}>At least 1 answer</option>
            <option value={3}>3+ answers</option>
            <option value={5}>5+ answers</option>
          </select>
        </div>

        {/* Reset button */}
        <button
          type="button"
          onClick={onReset}
          className="reset-button-action"
          title="Reset search, tags, sort, and filters"
        >
          <RotateCcw size={14} />
          <span>Reset Filters</span>
        </button>
      </div>

      <div className="controls-right">
        {quotaRemaining !== null && (
          <div className="api-quota-badge" title="Remaining daily Stack Exchange API calls">
            <span>API Quota:</span>
            <strong>{quotaRemaining}</strong>
          </div>
        )}
        {isFallback && (
          <span className="dataset-mode-pill fallback-mode" title="Serving local verified dataset">
            Mock / Demo Mode
          </span>
        )}
      </div>
    </div>
  );
}

export default SortControls;
