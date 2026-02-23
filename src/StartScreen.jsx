import { useEffect, useState } from "react";
import styles from "./StartScreen.module.css";
import User from "./User";
import SelectedUser from "./SelectedUser";
import FinishScreen from "./FinishScreen";

//https://api.github.com/search/users?q=QUERY

const topics = [
  "this",
  "call",
  "apply",
  "bind",
  "new",
  "prototype",
  "polyfill",
];

function StartScreen({
  dispatch,
  query,
  fetchedUsers,
  setFetchedUsers,
  setQuery,
  setSelecteduserDetals,
  selectedUserDetals,
}) {
  const [selectedUser, setSelecteduser] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      if (query.length <= 3) return;

      try {
        const res = await fetch(
          `https://api.github.com/search/users?q=${query}`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("Something went wrong!");

        const data = await res.json();

        if (data.incomplete_results)
          throw new Error("Something went wrong with github!");

        setFetchedUsers(data.items);
      } catch (err) {
        // Ignore abort errors
        if (err.name !== "AbortError") {
          console.log(err.message);
        }
      }
    }

    fetchUsers();

    // cleanup → abort previous request
    return () => controller.abort();
  }, [query, setFetchedUsers]);

  function handleUserSelection(id) {
    setSelecteduser(id);
  }

  return (
    <div className={styles.mainContainer}>
      <header>
        <h1 className={styles.mainHeading}>JavaScript Quiz</h1>
        <div className={styles.topicContainer}>
          Topics in this quiz:
          <ul className={styles.topics}>
            {topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>
      </header>

      {!selectedUser ? (
        <div className={styles.inputUserSetting}>
          <h2>Enter your github UserID</h2>
          <input
            className={styles.input}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className={styles.resultTab}>
            {fetchedUsers.map((user, i) =>
              i <= 10 ? (
                <User
                  key={user.id}
                  user={user}
                  onUserSelection={handleUserSelection}
                />
              ) : (
                ""
              ),
            )}
          </div>
        </div>
      ) : (
        <>
          <SelectedUser
            userId={selectedUser}
            selectedUserDetals={selectedUserDetals}
            setSelecteduserDetals={setSelecteduserDetals}
          />
          <button
            className={styles.startBtn}
            onClick={() => dispatch({ type: "startQuiz" })}
          >
            Start Quiz
          </button>
        </>
      )}

      <FinishScreen isSimple={true} />
    </div>
  );
}

export default StartScreen;
