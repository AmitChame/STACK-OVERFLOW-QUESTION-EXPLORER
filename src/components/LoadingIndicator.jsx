import { Loader2 } from "lucide-react";

export function LoadingIndicator({ message = "Fetching questions from Stack Exchange API..." }) {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <Loader2 size={36} className="spinner-icon" />
      <p className="loading-message">{message}</p>
      <div className="skeleton-cards-wrapper">
        <div className="skeleton-card" />
        <div className="skeleton-card" />
        <div className="skeleton-card" />
      </div>
    </div>
  );
}

export default LoadingIndicator;
