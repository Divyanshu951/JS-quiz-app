import React from "react";
import styles from "./User.module.css";

function User({ user, onUserSelection }) {
  return (
    <div className={styles.result} onClick={() => onUserSelection(user.login)}>
      <img src={user.avatar_url} alt="avatar" />
      <div className={styles.details}>
        <p>Login: {user.login}</p>
        <button>
          <a href={user.html_url} target="_blank">
            Github
          </a>
        </button>
      </div>
    </div>
  );
}

export default User;
