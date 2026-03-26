import { useEffect, useState } from "react";
import styles from "./StartScreen.module.css";
import User from "./User";
import SelectedUser from "./SelectedUser";
import FinishScreen from "./FinishScreen";
import AIQuizModal from "./AIQuizModal";
import { useQuiz } from "./Contexts/QuizContext";
import { useUser } from "./Contexts/UserContext";

const defaultTopics = [
  "this",
  "call",
  "apply",
  "bind",
  "new",
  "prototype",
  "polyfill",
];

function StartScreen() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const {
    state: { questions },
    dispatch,
  } = useQuiz();
  const { query, fetchedUsers, onFetchedUsers, onQuery } = useUser();

  // Derive displayed topics from current questions
  const topics = [...new Set(questions.map((q) => q.topic))];

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

        onFetchedUsers(data.items);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err.message);
        }
      }
    }

    fetchUsers();

    return () => controller.abort();
  }, [query, onFetchedUsers]);

  function handleUserSelection(id) {
    setSelectedUser(id);
  }

  return (
    <div className={styles.mainContainer}>
      <header>
        <h1 className={styles.mainHeading}>JavaScript Quiz</h1>
        <div className={styles.topicContainer}>
          <p>Topics in this quiz:</p>
          <ul className={styles.topics}>
            {topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>
        <button
          className={styles.aiBtn}
          onClick={() => setShowAIModal(true)}
        >
          ✨ Generate AI Quiz <span className={styles.betaTag}>BETA</span>
        </button>
      </header>

      {!selectedUser ? (
        <div className={styles.inputUserSetting}>
          <h2>Enter your github UserID</h2>
          <input
            className={styles.input}
            type="text"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
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
          <SelectedUser userId={selectedUser} />
          <button
            className={styles.startBtn}
            onClick={() => dispatch({ type: "startQuiz" })}
          >
            Start Quiz
          </button>
        </>
      )}

      <FinishScreen isSimple={true} />
      {showAIModal && <AIQuizModal onClose={() => setShowAIModal(false)} />}
    </div>
  );
}

export default StartScreen;
