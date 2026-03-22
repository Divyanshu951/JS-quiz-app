import { useQuiz } from "./Contexts/quizContext";
import Option from "./Option";
import styles from "./Question.module.css";

function Question() {
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
  //       state,
  //       dispatch,
  //       query,
  //       onQuery: setQuery,
  //       fetchedUsers,
  //       onFetchedUsers: setFetchedUsers,
  //       selectedUserDetails,
  //       onSelectedUserDetails: setSelectedUserDetails,
  //     }}

  const {
    state: { answer, questions, index },
    dispatch,
  } = useQuiz();

  const question = questions.at(index);

  return (
    <>
      <p className={styles.question}>{question.question}</p>

      <div className={styles.optionsContainer}>
        {question.options.map((option, i) => (
          <Option
            dispatch={dispatch}
            key={option.id}
            option={option}
            answer={answer}
            i={i}
            question={question}
          />
        ))}
      </div>
    </>
  );
}

export default Question;
