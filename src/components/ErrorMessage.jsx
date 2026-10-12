import { AlertTriangle, RefreshCw } from "lucide-react";

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message-banner" role="alert">
      <div className="error-icon-box">
        <AlertTriangle size={24} />
      </div>
      <div className="error-text-content">
        <h4>Unable to complete request</h4>
        <p>{message || "An unexpected error occurred while communicating with the API."}</p>
      </div>
      {onRetry && (
        <button type="button" onClick={onRetry} className="error-retry-btn">
          <RefreshCw size={15} />
          <span>Retry</span>
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
