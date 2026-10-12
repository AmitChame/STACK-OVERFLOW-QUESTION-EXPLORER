// This component shows one single question in a card
// It receives data using props from App.jsx

function QuestionCard(props) {
  const question = props.question;

  return (
    <div className="question-card">
      <h3>{question.title}</h3>
      <p>Category: {question.category}</p>
      <p>Votes: {question.votes}</p>
      <p>Answers: {question.answers}</p>
      <button onClick={props.onView}>View Details</button>
    </div>
  );
}

export default QuestionCard;
