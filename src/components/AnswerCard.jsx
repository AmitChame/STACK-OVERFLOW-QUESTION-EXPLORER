import DOMPurify from "dompurify";
import { CheckCircle2, ThumbsUp, User, Calendar } from "lucide-react";

export function AnswerCard({ answer }) {
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

  // Sanitize API provided HTML with DOMPurify
  const sanitizedHtml = DOMPurify.sanitize(answer.body || "", {
    ALLOWED_TAGS: [
      "p", "strong", "em", "code", "pre", "ul", "ol", "li", "a",
      "h1", "h2", "h3", "h4", "blockquote", "span", "table", "thead",
      "tbody", "tr", "th", "td", "br", "hr"
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class", "title"]
  });

  return (
    <article
      className={`answer-card-item ${answer.is_accepted ? "accepted-answer-card" : ""}`}
      data-testid={`answer-card-${answer.answer_id}`}
    >
      <div className="answer-sidebar">
        <div className="answer-score-box">
          <ThumbsUp size={14} />
          <span className="answer-score-num">{answer.score ?? 0}</span>
          <span className="answer-score-label">votes</span>
        </div>

        {answer.is_accepted && (
          <div className="accepted-badge" title="Accepted Solution by Question Author">
            <CheckCircle2 size={24} className="accepted-icon" />
            <span className="accepted-text">Accepted</span>
          </div>
        )}
      </div>

      <div className="answer-body-wrapper">
        <div
          className="answer-rendered-html markdown-content"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />

        <div className="answer-author-row">
          <div className="answer-date">
            <Calendar size={13} />
            <span>Answered {formatDate(answer.creation_date)}</span>
          </div>

          <div className="answer-user-box">
            {answer.owner?.profile_image ? (
              <img
                src={answer.owner.profile_image}
                alt={answer.owner.display_name}
                className="user-avatar-sm"
              />
            ) : (
              <User size={14} className="user-icon-sm" />
            )}
            <span className="user-name-sm">{answer.owner?.display_name || "Community Member"}</span>
            {answer.owner?.reputation && (
              <span className="user-rep-sm">
                ({answer.owner.reputation.toLocaleString()})
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default AnswerCard;
