import Option from "./Option";
import styles from "./Question.module.css";

function Question({ question, answer, dispatch }) {
  return (
    <>
      <p className={styles.question}>{question.question}</p>

      <div className={styles.optionsContainer}>
        {question.options.map((option, i) => (
          <Option
            dispatch={dispatch}
            key={option.id}
            option={option}
            answer={answer}
            i={i}
            question={question}
          />
        ))}
      </div>
    </>
  );
}

export default Question;
