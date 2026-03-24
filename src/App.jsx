import Header from "./Header";
import Question from "./Question";
import Hint from "./Hint";
import Timer from "./Timer";
import StartScreen from "./StartScreen";
import SelectedUser from "./SelectedUser";
import FinishScreen from "./FinishScreen";
import { useQuiz } from "./Contexts/QuizContext";

function App() {
  const {
    state: { status, points, questions, index, selectionAllowed },
    dispatch,
  } = useQuiz();

  const questionsCount = questions.length;

  return (
    <>
      <div className="contact">
        <a
          href="https://www.linkedin.com/in/divyanshu-357240165/"
          target="_blank"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>

      {status === "ready" && (
        <>
          <StartScreen />
        </>
      )}
      {status === "finish" && <FinishScreen />}
      {status === "ongoing" && (
        <>
          <div className="main-container">
            <Header />

            <main className="questionContainer">
              <div>Points: {points}</div>
              <Question />

              <div className="timerContainer">
                <Timer />
                <p
                  className="timer"
                  style={{
                    color: `${questions.at(index).difficulty === "easy" ? "#46c6c2" : questions.at(index).difficulty === "medium" ? "#fac31d" : "#f8615c"}`,
                  }}
                >
                  {questions.at(index).difficulty}
                </p>
                <button
                  disabled={selectionAllowed}
                  className="next"
                  onClick={() => dispatch({ type: "nextQuestion" })}
                >
                  {index === questionsCount - 1 ? "Finish" : "Next"}
                </button>
              </div>

              <Hint />
              <div style={{ position: "fixed", bottom: "30px", left: "30px" }}>
                <SelectedUser />
              </div>
            </main>
          </div>
        </>
      )}
    </>
  );
}

export default App;
