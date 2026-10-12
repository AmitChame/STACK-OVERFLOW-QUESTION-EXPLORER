import { POPULAR_TAGS } from "../api/mockData.js";
import { Tag } from "lucide-react";

export function TagFilter({ selectedTag, onSelectTag }) {
  return (
    <div className="tag-filter-container">
      <div className="tag-filter-label">
        <Tag size={15} />
        <span>Filter by Topic / Tag:</span>
      </div>
      <div className="tag-pills-row" role="group" aria-label="Filter questions by tag">
        {POPULAR_TAGS.map((tag) => {
          const isActive =
            selectedTag.toLowerCase() === tag.toLowerCase() ||
            (tag === "All" && selectedTag === "All");

          return (
            <button
              key={tag}
              type="button"
              className={`tag-pill-btn ${isActive ? "active" : ""}`}
              onClick={() => onSelectTag(tag)}
              aria-pressed={isActive}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TagFilter;
