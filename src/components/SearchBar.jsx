import { Search, XCircle } from "lucide-react";

export function SearchBar({ value, onChange, onClear, validationError }) {
  return (
    <div className="search-bar-wrapper">
      <div className={`search-input-group ${validationError ? "input-has-error" : ""}`}>
        <Search size={18} className="search-icon-adornment" />
        <input
          type="text"
          id="search-input"
          aria-label="Search questions"
          placeholder="Search question title, topics, or keywords..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="search-input-field"
        />
        {value && (
          <button
            type="button"
            className="search-clear-btn"
            onClick={onClear}
            title="Clear search text"
            aria-label="Clear search"
          >
            <XCircle size={18} />
          </button>
        )}
      </div>

      {validationError && (
        <p className="inline-validation-error" role="alert">
          {validationError}
        </p>
      )}
    </div>
  );
}

export default SearchBar;
