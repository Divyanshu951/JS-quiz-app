import styles from "./Option.module.css";

function Option({ question, option, answer, i, dispatch }) {
  const isAnswered = answer !== null;
  const isCorrect = i === question.correctAnswer;
  const isSelected = i === answer;

  let className = styles.option;

  if (isAnswered) {
    if (isCorrect) className += ` ${styles.correct}`;
    else if (isSelected && !isCorrect) className += ` ${styles.wrong}`;
  }

  return (
    <button
      onClick={() => dispatch({ type: "setAnswer", payLoad: i })}
      className={className}
    >
      <span>{option.id}. </span>
      {option.text}
    </button>
  );
}

export default Option;
