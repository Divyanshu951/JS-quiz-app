import { createContext, useContext, useReducer, useState } from "react";
import questions from "../data";

const QuizContext = createContext();

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

// const totalPoints = questions.reduce(
//   (total, question) => total + question.points,
//   0,
// );

function reducer(state, action) {
  switch (action.type) {
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        selectionAllowed: true,
        answer: null,
        hintExpanded: false,
        status: state.index === questions.length - 1 ? "finish" : state.status,
      };
    case "setAnswer": {
      if (!state.selectionAllowed) return state;

      const currentQuestion = state.questions.at(state.index);
      const isCorrect = action.payLoad === currentQuestion.correctAnswer;

      return {
        ...state,
        selectionAllowed: false,
        answer: state.selectionAllowed ? action.payLoad : null,

        points: isCorrect
          ? state.points + currentQuestion.points
          : state.points,
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

function QuiZProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [query, setQuery] = useState("");
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [selectedUserDetails, setSelectedUserDetails] = useState({});

  return (
    <QuizContext.Provider
      value={{
        state,
        dispatch,
        query,
        onQuery: setQuery,
        fetchedUsers,
        onFetchedUsers: setFetchedUsers,
        selectedUserDetails,
        onSelectedUserDetails: setSelectedUserDetails,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("QuizContext was used outside the QuizProvider");
  return context;
}

export { QuiZProvider, useQuiz };
