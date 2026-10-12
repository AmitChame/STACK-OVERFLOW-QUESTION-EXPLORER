import { Link, useNavigate } from "react-router-dom";
import BookmarkButton from "./BookmarkButton.jsx";
import { MessageSquare, ThumbsUp, Eye, User, Calendar, ExternalLink } from "lucide-react";

export function QuestionCard({ question, onView }) {
  const navigate = useNavigate();
  const qId = question.id || question.question_id;

  // Format creation timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return "Recently";
    const date = new Date(timestamp > 10000000000 ? timestamp : timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const handleCardClick = (e) => {
    // If user clicked inside a button or link, don't double navigate
    if (e.target.closest("button") || e.target.closest("a")) return;
    if (onView) {
      onView(question);
    } else {
      navigate(`/questions/${qId}`);
    }
  };

  const votesCount = question.votes ?? question.score ?? 0;
  const answersCount = question.answers ?? question.answer_count ?? 0;
  const viewsCount = question.view_count ?? 0;
  const tagsList = question.tags || (question.category ? [question.category.toLowerCase()] : []);

  return (
    <article
      className="question-card-item"
      onClick={handleCardClick}
      data-testid={`question-card-${qId}`}
    >
      {/* Left Metrics Column */}
      <div className="card-metrics-col">
        <div className={`metric-pill votes-pill ${votesCount > 10 ? "high-votes" : ""}`}>
          <ThumbsUp size={13} />
          <span className="metric-num">{votesCount}</span>
          <span className="metric-text">votes</span>
        </div>

        <div
          className={`metric-pill answers-pill ${
            answersCount > 0 ? "has-answers" : "no-answers"
          } ${question.is_answered ? "accepted-answer" : ""}`}
        >
          <MessageSquare size={13} />
          <span className="metric-num">{answersCount}</span>
          <span className="metric-text">answers</span>
        </div>

        {viewsCount > 0 && (
          <div className="metric-pill views-pill">
            <Eye size={12} />
            <span className="metric-num">{viewsCount}</span>
            <span className="metric-text">views</span>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="card-content-col">
        <div className="card-header-row">
          <h3 className="card-title">
            <Link to={`/questions/${qId}`} className="question-title-link">
              {question.title}
            </Link>
          </h3>
          <BookmarkButton question={question} />
        </div>

        {/* Short summary / description */}
        <p className="card-excerpt">
          {question.description ||
            (question.body
              ? question.body.replace(/<[^>]+>/g, "").slice(0, 160) + "..."
              : "Click to explore full question details and answers.")}
        </p>

        {/* Tags Row */}
        <div className="card-tags-row">
          {tagsList.map((tag, idx) => (
            <span key={idx} className="card-tag-badge">
              {tag}
            </span>
          ))}
          {question.category && !tagsList.includes(question.category.toLowerCase()) && (
            <span className="card-tag-badge category-badge">
              {question.category}
            </span>
          )}
        </div>

        {/* Card Footer: Author info & Details CTA */}
        <div className="card-footer-row">
          <div className="author-meta">
            {question.owner?.profile_image ? (
              <img
                src={question.owner.profile_image}
                alt={question.owner.display_name}
                className="author-avatar"
              />
            ) : (
              <User size={14} className="author-placeholder-icon" />
            )}
            <span className="author-name">
              {question.owner?.display_name || "Community User"}
            </span>
            {question.owner?.reputation && (
              <span className="author-reputation">
                ({question.owner.reputation.toLocaleString()})
              </span>
            )}
            <span className="date-meta">
              <Calendar size={12} />
              {formatDate(question.creation_date)}
            </span>
          </div>

          <div className="card-actions">
            {question.link && (
              <a
                href={question.link}
                target="_blank"
                rel="noopener noreferrer"
                className="external-link-btn"
                title="View original on Stack Overflow"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={13} />
                <span>Original</span>
              </a>
            )}

            <button
              type="button"
              className="view-details-cta"
              onClick={(e) => {
                e.stopPropagation();
                if (onView) onView(question);
                navigate(`/questions/${qId}`);
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default QuestionCard;
