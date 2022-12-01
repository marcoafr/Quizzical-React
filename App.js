import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

export default function App(props) {
  const [questions, setQuestions] = React.useState([]);
  const [correctAnswers, setCorrectAnswers] = React.useState([]);
  const [chosenAnswers, setChosenAnswers] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [seeResults, setSeeResults] = React.useState(false);
  const [resultMessage, setResultMessage] = React.useState("");
  const [finalButtonText, setFinalButtonText] = React.useState("Check Answers");
  const [newGame, setNewGame] = React.useState(true);
  const [highScore, setHighScore] = React.useState(
    () => JSON.parse(localStorage.getItem("highscore")) || 0
  );

  React.useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=${props.questionsAmount}&type=multiple${props.questionsCategory}${props.questionsDifficulty}`
    )
      .then((res) => res.json())
      .then((data) => setQuestions(data.results));
  }, []);

  const questionElements = questions.map((q) => {
    const newId = nanoid();
    return (
      <Question
        question={props.htmlDecoder(q.question)}
        correctAnswer={props.htmlDecoder(q.correct_answer)}
        incorrectAnswer={q.incorrect_answers}
        difficulty={q.difficulty}
        key={newId}
        id={newId}
        chosenAnswersArray={chosenAnswers}
        setChosenAnswersArray={setChosenAnswers}
        order={questions.indexOf(q)}
        seeResults={seeResults}
        htmlDecoder={(string) => props.htmlDecoder(string)}
      />
    );
  });

  React.useEffect(() => {
    setCorrectAnswers(
      questionElements.map((quest) => ({
        answer: quest.props.correctAnswer,
        order: questionElements.indexOf(quest),
      }))
    );
  }, [questions]);

  function checkResult(e) {
    if (e.target.textContent === "Play Again") {
      document.location.reload(true);
    }

    if (chosenAnswers.length !== Number(props.questionsAmount)) {
      const missingQuestions = correctAnswers.length - chosenAnswers.length;
      alert(
        `You must answer all questions! There ${
          missingQuestions === 1 ? "is 1" : `are ${missingQuestions}`
        } missing! ❌`
      );
      return;
    }

    setSeeResults(true);
    let currentScore = 0;
    let array1 = [...chosenAnswers];
    array1.sort((a, b) => (a.order > b.order ? 1 : b.order > a.order ? -1 : 0));
    let array2 = [...correctAnswers];
    array2.sort((a, b) => (a.order > b.order ? 1 : b.order > a.order ? -1 : 0));

    for (let i = 0; i < correctAnswers.length; i++) {
      if (
        array1[i].answer === array2[i].answer &&
        array1[i].order === array2[i].order
      ) {
        currentScore++;
      }
    }

    if ((currentScore / Number(props.questionsAmount)) * 100 > highScore) {
      setHighScore((currentScore / Number(props.questionsAmount)) * 100);
      localStorage.setItem(
        "highscore",
        JSON.stringify((currentScore / Number(props.questionsAmount)) * 100)
      );
    }

    setResultMessage(
      `Your score was ${currentScore} out of ${props.questionsAmount}! (${
        (currentScore / Number(props.questionsAmount)) * 100
      } %)`
    );
    setFinalButtonText("Play Again");
  }

  return (
    <div>
      <div>
        {questionElements}
        <div className="ui">
          <button className="answers-button" onClick={checkResult}>
            {finalButtonText}
          </button>
          <p>{resultMessage}</p>
          <p>Your actual highscore is: {highScore} %</p>
        </div>
      </div>
    </div>
  );
}
