import { useEffect, useState } from "react";
import styles from "./StartScreen.module.css";
import User from "./User";
import SelectedUser from "./SelectedUser";

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

function StartScreen({ dispatch }) {
  const [query, setQuery] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [selectedUser, setSelecteduser] = useState(null);

  useEffect(
    function () {
      async function fetchUsers() {
        if (query.length <= 3) return;

        try {
          const res = await fetch(
            `https://api.github.com/search/users?q=${query}`,
          );
          if (!res.ok) throw new Error("Something went wrong!");

          const data = await res.json();
          if (data.incomplete_results)
            throw new Error("Something went wrong with github!");

          // console.log(data);
          setFetchedUsers([...data.items]);
        } catch (err) {
          console.log(err.message);
        }
      }
      fetchUsers();
    },
    [query],
  );

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
        <SelectedUser userId={selectedUser} dispatch={dispatch} />
      )}
    </div>
  );
}

export default StartScreen;
