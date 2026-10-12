import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { fetchQuestionDetails } from "../api/stackExchangeApi.js";
import BookmarkButton from "../components/BookmarkButton.jsx";
import AnswerCard from "../components/AnswerCard.jsx";
import LoadingIndicator from "../components/LoadingIndicator.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import {
  ArrowLeft,
  ThumbsUp,
  MessageSquare,
  Eye,
  Calendar,
  User,
  ExternalLink,
  Tag,
  Share2
} from "lucide-react";
import { useBookmarks } from "../context/BookmarkContext.jsx";

export function QuestionDetailsPage({ forceMock }) {
  const { questionId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useBookmarks();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function loadDetails() {
      setLoading(true);
      setError(null);

      // Validate numeric ID
      if (!questionId || isNaN(Number(questionId))) {
        setError(`Invalid question identifier: "${questionId}". Question IDs must be numeric.`);
        setLoading(false);
        return;
      }

      try {
        const result = await fetchQuestionDetails(questionId, {
          signal: controller.signal,
          forceMock
        });

        if (!isMounted) return;

        if (!result || !result.question) {
          setError(`Question #${questionId} was not found on Stack Overflow.`);
        } else {
          setData(result);
        }
      } catch (err) {
        if (!isMounted) return;
        if (err.name !== "AbortError") {
          setError(err.message || "Unable to retrieve question details.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadDetails();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [questionId, forceMock]);

  // Format timestamp helper
  const formatDate = (timestamp) => {
    if (!timestamp) return "Recently";
    const date = new Date(timestamp > 10000000000 ? timestamp : timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="details-page-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to Explore</span>
        </Link>
        <LoadingIndicator message={`Loading question #${questionId}...`} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="details-page-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to Explore</span>
        </Link>
        <ErrorMessage
          message={error || "Question details unavailable."}
          onRetry={() => window.location.reload()}
        />
        <div className="invalid-id-help">
          <p>Please return to the explore catalog to select a valid question.</p>
          <Link to="/" className="btn-return-home">
            Return to Questions List
          </Link>
        </div>
      </div>
    );
  }

  const { question, answers, isFallback } = data;

  // Sanitize question body
  const sanitizedQuestionBody = DOMPurify.sanitize(question.body || "", {
    ALLOWED_TAGS: [
      "p", "strong", "em", "code", "pre", "ul", "ol", "li", "a",
      "h1", "h2", "h3", "h4", "blockquote", "span", "table", "thead",
      "tbody", "tr", "th", "td", "br", "hr", "img"
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class", "src", "alt", "title"]
  });

  const votesCount = question.votes ?? question.score ?? 0;
  const answersCount = answers?.length ?? question.answers ?? question.answer_count ?? 0;
  const viewsCount = question.view_count ?? 0;
  const tagsList = question.tags || (question.category ? [question.category.toLowerCase()] : []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      if (showToast) showToast("Question URL copied to clipboard!", "info");
    }
  };

  return (
    <div className="details-page-container" data-testid="question-details-page">
      {/* Top Breadcrumb & Actions */}
      <div className="details-top-bar">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} />
          <span>Back to Questions</span>
        </Link>

        <div className="top-bar-actions">
          <button type="button" onClick={handleShare} className="share-link-btn" title="Share Question">
            <Share2 size={15} />
            <span>Share</span>
          </button>
          <BookmarkButton question={question} showLabel={true} />
        </div>
      </div>

      {isFallback && (
        <div className="fallback-alert-banner">
          <small>ℹ️ Notice: Displaying local verified question dataset and sample answers.</small>
        </div>
      )}

      {/* Main Question Article */}
      <article className="question-main-article">
        <header className="question-header">
          <h1 className="question-title-heading">{question.title}</h1>

          <div className="question-metadata-strip">
            <div className="meta-item">
              <Calendar size={14} />
              <span>Asked on {formatDate(question.creation_date)}</span>
            </div>

            <div className="meta-item">
              <Eye size={14} />
              <span>{viewsCount.toLocaleString()} views</span>
            </div>

            <div className="meta-item">
              <MessageSquare size={14} />
              <span>{answersCount} answers</span>
            </div>

            {question.link && (
              <a
                href={question.link}
                target="_blank"
                rel="noopener noreferrer"
                className="meta-item external"
              >
                <ExternalLink size={14} />
                <span>Original on Stack Overflow</span>
              </a>
            )}
          </div>
        </header>

        {/* Question Score & Body Layout */}
        <div className="question-layout-row">
          <div className="question-votes-sidebar">
            <div className="votes-counter-card">
              <ThumbsUp size={18} />
              <span className="votes-counter-number">{votesCount}</span>
              <span className="votes-counter-label">votes</span>
            </div>
          </div>

          <div className="question-body-wrapper">
            <div
              className="question-rendered-body markdown-content"
              dangerouslySetInnerHTML={{ __html: sanitizedQuestionBody }}
            />

            {/* Tags Strip */}
            <div className="question-tags-strip">
              <Tag size={14} className="tag-icon-muted" />
              {tagsList.map((tag, idx) => (
                <span key={idx} className="card-tag-badge">
                  {tag}
                </span>
              ))}
            </div>

            {/* Author Profile Card */}
            <div className="question-author-card">
              <span className="author-card-label">Asked by</span>
              <div className="author-card-profile">
                {question.owner?.profile_image ? (
                  <img
                    src={question.owner.profile_image}
                    alt={question.owner.display_name}
                    className="author-avatar-lg"
                  />
                ) : (
                  <User size={20} className="author-placeholder-icon" />
                )}
                <div>
                  <h4 className="author-name-lg">{question.owner?.display_name || "Community Member"}</h4>
                  {question.owner?.reputation && (
                    <span className="author-rep-badge">
                      {question.owner.reputation.toLocaleString()} rep
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Answers Section */}
      <section className="answers-section" data-testid="answers-section">
        <div className="answers-header-row">
          <h2 className="answers-count-title">
            {answers.length} {answers.length === 1 ? "Community Answer" : "Community Answers"}
          </h2>
        </div>

        {answers.length === 0 ? (
          <div className="no-answers-box">
            <p>No answers have been recorded for this question yet.</p>
          </div>
        ) : (
          <div className="answers-list">
            {answers.map((ans) => (
              <AnswerCard key={ans.answer_id} answer={ans} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default QuestionDetailsPage;
