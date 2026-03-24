import { useQuiz } from "./Contexts/QuizContext";
import styles from "./Hint.module.css";

function Hint() {
  const {
    state: { hintExpanded, questions, index },
    dispatch,
  } = useQuiz();

  return (
    <div className={styles.hintContainer}>
      <button
        className={styles.btn}
        onClick={() => dispatch({ type: "handleHint" })}
      >
        {hintExpanded ? "Hide Hint" : "Show Hint"}{" "}
        <i
          className={`fa-solid ${
            hintExpanded ? "fa-caret-up" : "fa-caret-down"
          }`}
        ></i>
      </button>

      <div
        className={`${styles.hint} ${hintExpanded ? styles.hintVisible : ""}`}
      >
        <p>
          <i className="fa-regular fa-lightbulb"></i> {questions.at(index).hint}
        </p>
      </div>
    </div>
  );
}

export default Hint;
