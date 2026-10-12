import QuestionCard from "./QuestionCard.jsx";
import LoadingIndicator from "./LoadingIndicator.jsx";
import EmptyState from "./EmptyState.jsx";
import ErrorMessage from "./ErrorMessage.jsx";

export function QuestionList({
  questions,
  loading,
  error,
  onRetry,
  onReset,
  onViewQuestion
}) {
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (!questions || questions.length === 0) {
    return (
      <EmptyState
        title="No questions found"
        description="Try adjusting your search terms, changing the topic tag, or resetting filters."
        onReset={onReset}
      />
    );
  }

  return (
    <div className="questions-container-list" data-testid="question-list">
      {questions.map((question) => (
        <QuestionCard
          key={question.id || question.question_id}
          question={question}
          onView={onViewQuestion}
        />
      ))}
    </div>
  );
}

export default QuestionList;
