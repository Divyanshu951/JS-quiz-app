import { useEffect } from "react";
import styles from "./SelectedUser.module.css";

function SelectedUser({ userId, selectedUserDetals, setSelecteduserDetals }) {
  useEffect(
    function () {
      async function fetchUsers() {
        try {
          const res = await fetch(`https://api.github.com/users/${userId}`);
          if (!res.ok) throw new Error("Something went wrong!");

          const data = await res.json();
          if (data.incomplete_results)
            throw new Error("Something went wrong with github!");
          setSelecteduserDetals({ ...data });
        } catch (err) {
          console.log(err.message);
        }
      }
      fetchUsers();
    },
    [userId, setSelecteduserDetals],
  );

  return (
    <div className={styles.userContainer}>
      <div className={styles.userCard}>
        <img
          src={selectedUserDetals.avatar_url}
          alt={`${selectedUserDetals.login} avatar`}
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <h3 className={styles.name}>{selectedUserDetals.name}</h3>
          <a
            href={selectedUserDetals.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.username}
          >
            @{selectedUserDetals.login}
          </a>
          <p className={styles.bio}>{selectedUserDetals.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default SelectedUser;
