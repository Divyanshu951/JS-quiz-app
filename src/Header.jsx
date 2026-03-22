import React from "react";
import styles from "./Header.module.css";
import { useQuiz } from "./Contexts/quizContext";

function Header() {
  const {
    state: { questions, index: current, correctScore, wrongScore },
  } = useQuiz();

  return (
    <div className={styles.mainHeader}>
      <div className={styles.barContainer}>
        {Array.from({ length: questions.length }).map((_, index) => (
          <div
            key={index}
            className={`${styles.bar} ${current >= index ? styles.barDone : ""} ${current === index ? styles.barActive : ""}`}
          ></div>
        ))}
      </div>
      <div className={styles.scoreContainer}>
        <div className={styles.correctContainer}>{correctScore}</div>
        <div className={styles.wrongContainer}>{wrongScore}</div>
      </div>
    </div>
  );
}

export default Header;
