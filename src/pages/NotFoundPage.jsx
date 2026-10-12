import { Link } from "react-router-dom";
import { FileQuestion, Home } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="not-found-container" data-testid="not-found-page">
      <FileQuestion size={64} className="not-found-icon" />
      <h1 className="not-found-title">404 — Page Not Found</h1>
      <p className="not-found-desc">
        The route or question resource you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn-return-home">
        <Home size={16} />
        <span>Return to Home Explorer</span>
      </Link>
    </div>
  );
}

export default NotFoundPage;
