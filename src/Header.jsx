import React from "react";
import styles from "./Header.module.css";

function Header({ totalQuestion, current, correctScore, wrongScore }) {
  return (
    <div className={styles.mainHeader}>
      <div className={styles.barContainer}>
        {Array.from({ length: totalQuestion }).map((_, index) => (
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
