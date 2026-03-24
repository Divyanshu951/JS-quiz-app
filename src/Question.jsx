import { useQuiz } from "./Contexts/QuizContext";
import Option from "./Option";
import styles from "./Question.module.css";

function Question() {
  const {
    state: { questions, index },
  } = useQuiz();

  const question = questions.at(index);

  return (
    <>
      <p className={styles.question}>{question.question}</p>

      <div className={styles.optionsContainer}>
        {question.options.map((option, i) => (
          <Option key={option.id} option={option} i={i} />
        ))}
      </div>
    </>
  );
}

export default Question;
