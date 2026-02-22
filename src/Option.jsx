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

  function formatText(text, styles) {
    const parts = text.split(/(`[^`]+`)/g);

    return parts.map((part, index) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <span key={index} className={styles.code}>
            {part.slice(1, -1)}
          </span>
        );
      }
      return part;
    });
  }

  return (
    <button
      onClick={() => dispatch({ type: "setAnswer", payLoad: i })}
      className={className}
    >
      <span>{option.id}. </span> {formatText(option.text, styles)}
    </button>
  );
}

export default Option;
