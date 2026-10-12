import { SearchX, RotateCcw } from "lucide-react";

export function EmptyState({
  title = "No questions found",
  description = "No questions matched your current search keywords or selected filters.",
  onReset
}) {
  return (
    <div className="empty-state-card" data-testid="empty-state">
      <div className="empty-state-icon">
        <SearchX size={44} />
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-desc">{description}</p>
      {onReset && (
        <button type="button" onClick={onReset} className="empty-state-action-btn">
          <RotateCcw size={15} />
          <span>Reset All Filters</span>
        </button>
      )}
    </div>
  );
}

export default EmptyState;
