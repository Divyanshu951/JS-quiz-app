import { useEffect, useState } from "react";
import styles from "./SelectedUser.module.css";

function SelectedUser({ userId, dispatch }) {
  const [selectedUser, setSelecteduser] = useState({});

  useEffect(
    function () {
      async function fetchUsers() {
        try {
          const res = await fetch(`https://api.github.com/users/${userId}`);
          if (!res.ok) throw new Error("Something went wrong!");

          const data = await res.json();
          if (data.incomplete_results)
            throw new Error("Something went wrong with github!");

          console.log(data);
          setSelecteduser({ ...data });
        } catch (err) {
          console.log(err.message);
        }
      }
      fetchUsers();
    },
    [userId],
  );

  return (
    <div className={styles.userContainer}>
      <div className={styles.userCard}>
        <img
          src={selectedUser.avatar_url}
          alt={`${selectedUser.login} avatar`}
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <h3 className={styles.name}>{selectedUser.name}</h3>
          <a
            href={selectedUser.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.username}
          >
            @{selectedUser.login}
          </a>
          <p className={styles.bio}>{selectedUser.bio}</p>
        </div>
      </div>
      <button
        className={styles.startBtn}
        onClick={() => dispatch({ type: "startQuiz" })}
      >
        Start
      </button>
    </div>
  );
}

export default SelectedUser;
