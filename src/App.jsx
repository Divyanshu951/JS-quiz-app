import { useReducer } from "react";
import Header from "./Header";
import Question from "./Question";
import Hint from "./Hint";

const questions = [
  {
    id: 1,
    topic: "call, apply, bind",
    difficulty: "easy",
    points: 10,
    question:
      "What is the primary difference between `call()` and `apply()` in JavaScript?",
    options: [
      {
        id: 0,
        text: "`apply()` changes the prototype, while `call()` changes the context.",
      },
      {
        id: 1,
        text: "`apply()` takes an array of arguments, while `call()` takes them individually.",
      },
      {
        id: 2,
        text: "`call()` takes an array of arguments, while `apply()` takes them individually.",
      },
      {
        id: 3,
        text: "`call()` returns a new function, while `apply()` executes it immediately.",
      },
    ],
    correctAnswer: 1,
    hint: "Think of the 'A' in one of the methods as standing for 'Array'.",
    successMessage: "That's right!",
    errorMessage: "Not quite. Remember how arguments are passed.",
    explanation:
      "Both methods execute a function with a specified `this` context, but `apply` requires arguments to be passed as an array, whereas `call` accepts a comma-separated list.",
  },
  {
    id: 2,
    topic: "call, apply, bind",
    difficulty: "easy",
    points: 10,
    question: "What does the `bind()` method return?",
    options: [
      { id: 0, text: "The result of the executed function." },
      { id: 1, text: "An array of bound arguments." },
      { id: 2, text: "A new function with the bound `this` context." },
      { id: 3, text: "The global `window` object." },
    ],
    correctAnswer: 2,
    hint: "Unlike call and apply, this method doesn't execute immediately.",
    successMessage: "Spot on!",
    errorMessage:
      "Incorrect. Think about what you need to do to run the function later.",
    explanation:
      "`bind()` creates and returns a new function that, when called, has its `this` keyword set to the provided value.",
  },
  {
    id: 3,
    topic: "new",
    difficulty: "easy",
    points: 10,
    question:
      "Which of the following is the FIRST step that occurs when the `new` keyword is used?",
    options: [
      { id: 0, text: "The function executes immediately." },
      { id: 1, text: "A new empty object is created." },
      { id: 2, text: "The `this` keyword is bound to the global object." },
      { id: 3, text: "It returns a newly constructed object." },
    ],
    correctAnswer: 1,
    hint: "Before anything can be attached to `this`, a container needs to exist.",
    successMessage: "Correct!",
    errorMessage: "Oops! Look at the lifecycle of object creation.",
    explanation:
      "When you use `new`, JavaScript first creates a brand new, empty object before binding `this` to it and executing the constructor function.",
  },
  {
    id: 4,
    topic: "prototype",
    difficulty: "easy",
    points: 10,
    question: "What is a 'prototype' in JavaScript?",
    options: [
      { id: 0, text: "A strict rule for naming variables." },
      {
        id: 1,
        text: "An object from which other objects inherit properties.",
      },
      { id: 2, text: "A built-in function to copy arrays." },
      { id: 3, text: "A method used to loop through objects." },
    ],
    correctAnswer: 1,
    hint: "Think of it as a blueprint or parent for objects.",
    successMessage: "Great job!",
    errorMessage: "Not exactly. It has to do with inheritance.",
    explanation:
      "JavaScript is a prototype-based language. Every object has a hidden internal property that points to another object, its prototype, from which it inherits methods and properties.",
  },
  {
    id: 5,
    topic: "prototype",
    difficulty: "easy",
    points: 10,
    question:
      "How do you access the prototype of an object instance in modern JavaScript?",
    options: [
      { id: 0, text: "Object.getPrototype(obj)" },
      { id: 1, text: "obj.prototype" },
      { id: 2, text: "Object.getPrototypeOf(obj)" },
      { id: 3, text: "obj.parent" },
    ],
    correctAnswer: 2,
    hint: "It's a static method on the `Object` constructor.",
    successMessage: "Exactly!",
    errorMessage: "Almost. Look for the modern, standard method.",
    explanation:
      "`Object.getPrototypeOf()` is the standard way to retrieve the prototype of an object instance. The `.prototype` property only exists on constructor functions, not instances.",
  },
];

const initialState = {
  // ready - homeScreen, start: - ongoinf ,finish - result page
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
  } = state;

  const questionsCount = questions.length;
  return (
    <>
      <div className="main-container">
        <Header
          totalQuestion={questionsCount}
          current={index}
          correctScore={correctScore}
          wrongScore={wrongScore}
        />

        <main className="questionContainer">
          <div>{points}</div>
          <Question
            question={questions.at(index)}
            answer={answer}
            dispatch={dispatch}
          />

          <div className="timerContainer">
            <p className="timer">00:00</p>
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
  );
}

export default App;
