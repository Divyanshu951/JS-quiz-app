import { useEffect } from "react";
import styles from "./SelectedUser.module.css";
import { useQuiz } from "./Contexts/quizContext";

function SelectedUser({ userId }) {
  const { selectedUserDetails, onSelectedUserDetails } = useQuiz();
  //   const initialState = {
  //   // ready - homeScreen, start: - ongoing ,finish - result page
  //   questions,
  //   status: "ready",
  //   selectionAllowed: true,
  //   answer: null,
  //   index: 0,
  //   correctScore: 0,
  //   points: 0,
  //   wrongScore: 0,
  //   hintExpanded: false,
  // };

  //  value={{
  //         state,
  //         dispatch,
  //         query,
  //         onQuery: setQuery,
  //         fetchedUsers,
  //         onFetchedUsers: setFetchedUsers,
  //         selectedUserDetails,
  //         onSelectedUserDetails: onSelectedUserDetails,
  //       }}

  useEffect(
    function () {
      async function fetchUsers() {
        try {
          const res = await fetch(`https://api.github.com/users/${userId}`);
          if (!res.ok) throw new Error("Something went wrong!");

          const data = await res.json();
          if (data.incomplete_results)
            throw new Error("Something went wrong with github!");
          onSelectedUserDetails({ ...data });
        } catch (err) {
          console.log(err.message);
        }
      }
      fetchUsers();
    },
    [userId, onSelectedUserDetails],
  );

  return (
    <div className={styles.userContainer}>
      <div className={styles.userCard}>
        <img
          src={selectedUserDetails.avatar_url}
          alt={`${selectedUserDetails.login} avatar`}
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <h3 className={styles.name}>{selectedUserDetails.name}</h3>
          <a
            href={selectedUserDetails.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.username}
          >
            @{selectedUserDetails.login}
          </a>
          <p className={styles.bio}>{selectedUserDetails.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default SelectedUser;
