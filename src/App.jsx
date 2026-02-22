import { useReducer } from "react";
import Header from "./Header";
import Question from "./Question";
import Hint from "./Hint";
import questions from "./data";
import Timer from "./Timer";
import StartScreen from "./StartScreen";
import FinishScreen from "./FinishScreen";

const initialState = {
  // ready - homeScreen, start: - ongoing ,finish - result page
  questions,
  status: "ready",
  selectionAllowed: true,
  answer: null,
  index: 0,
  correctScore: 0,
  points: 0,
  wrongScore: 0,
  hintExpanded: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        selectionAllowed: true,
        answer: null,
        hintExpanded: false,
      };
    case "setAnswer": {
      if (!state.selectionAllowed) return state;

      const currentQueston = state.questions.at(state.index);
      const isCorrect = action.payLoad === currentQueston.correctAnswer;

      return {
        ...state,
        selectionAllowed: false,
        answer: state.selectionAllowed ? action.payLoad : null,

        points: isCorrect ? state.points + currentQueston.points : state.points,
        correctScore: isCorrect ? state.correctScore + 1 : state.correctScore,

        wrongScore: !isCorrect ? state.wrongScore + 1 : state.wrongScore,
      };
    }
    case "handleHint":
      return {
        ...state,
        hintExpanded: !state.hintExpanded,
      };
    case "startQuiz":
      return {
        ...state,
        status: "ongoing",
      };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    answer,
    index,
    correctScore,
    wrongScore,
    points,
    selectionAllowed,
    hintExpanded,
    status,
  } = state;

  const questionsCount = questions.length;
  return (
    <>
      {status === "ready" && <StartScreen dispatch={dispatch} />}
      {status === "finish" && <FinishScreen />}
      {status === "ongoing" && (
        <>
          <div className="main-container">
            <Header
              totalQuestion={questionsCount}
              current={index}
              correctScore={correctScore}
              wrongScore={wrongScore}
            />

            <main className="questionContainer">
              <div>Points: {points}</div>
              <Question
                question={questions.at(index)}
                answer={answer}
                dispatch={dispatch}
              />

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

              <Hint
                hint={questions.at(index).hint}
                hintExpanded={hintExpanded}
                dispatch={dispatch}
              />
            </main>
          </div>
        </>
      )}
    </>
  );
}

export default App;
