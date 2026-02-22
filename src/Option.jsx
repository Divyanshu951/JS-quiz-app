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
      <div className={styles.optionText}>
        <span>{option.id}. </span>{" "}
        <div>
          <p className={styles.text}>{formatText(option.text, styles)}</p>

          {/* Message logic */}

          {isAnswered && isCorrect && (
            <p className={styles.disc}>
              {isCorrect && formatText(question.explanation, styles)}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

export default Option;
