import React from "react";
import App from "./App";

export default function Menu() {
  const [game, setGame] = React.useState(false);
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [difficulty, setDifficulty] = React.useState("");

  function htmlDecoder(string) {
    return string
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<")
      .replace(/&agrave;/g, "à")
      .replace(/&aacute;/g, "á")
      .replace(/&acirc;/g, "â")
      .replace(/&ccedil;/g, "ç")
      .replace(/&egrave;/g, "è")
      .replace(/&eacute;/g, "é")
      .replace(/&ecirc;/g, "ê")
      .replace(/&igrave;/g, "ì")
      .replace(/&iacute;/g, "í")
      .replace(/&icirc;/g, "î")
      .replace(/&ntilde;/g, "ñ")
      .replace(/&ograve;/g, "ò")
      .replace(/&oacute;/g, "ó")
      .replace(/&ocirc;/g, "ô")
      .replace(/&ugrave;/g, "ù")
      .replace(/&uacute;/g, "ú")
      .replace(/&ucirc;/g, "û");
  }

  function startGame() {
    setGame((prevGame) => !prevGame.game);
    setAmount(document.querySelector("#amount").value);
    setCategory(document.querySelector("#category").value);
    setDifficulty(document.querySelector("#difficulty").value);
    /*
        output = selectElement.value;
        document.querySelector('.output').textContent = output;
        */
  }

  const categoriesOptions = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <div>
      {!game && (
        <div className="menu">
          <h1 className="menu-title">Quizzical</h1>
          <h4 className="menu-author">Developed by: Marco Ribeiro (ReactJS)</h4>
          <h5 className="menu-description">
            Have fun answering random questions!
          </h5>
          <h3>Number of Questions</h3>
          <select id="amount">
            <option value="5">5 Questions</option>
            <option value="10">10 Questions</option>
            <option value="15">15 Questions</option>
            <option value="20">20 Questions</option>
          </select>
          <h3>Categories</h3>
          <select id="category">
            <option value="">Any Category</option>
            <option value="&category=9">General Knowledge</option>
            <option value="&category=10">Entertainment: Books</option>
            <option value="&category=11">Entertainment: Film</option>
            <option value="&category=12">Entertainment: Music</option>
            <option value="&category=13">
              Entertainment: Musicals and Theaters
            </option>
            <option value="&category=14">Entertainment: Television</option>
            <option value="&category=15">Entertainment: Video Games</option>
            <option value="&category=16">Entertainment: Board Games</option>
            <option value="&category=17">Science & Nature</option>
            <option value="&category=18">Science: Computers</option>
            <option value="&category=19">Science: Mathematics</option>
            <option value="&category=20">Mythology</option>
            <option value="&category=21">Sports</option>
            <option value="&category=22">Geography</option>
            <option value="&category=23">History</option>
            <option value="&category=24">Politics</option>
            <option value="&category=25">Art</option>
            <option value="&category=26">Celebrities</option>
            <option value="&category=27">Animals</option>
            <option value="&category=28">Vehicles</option>
            <option value="&category=29">Entertainment: Comics</option>
            <option value="&category=30">Science: Gadgets</option>
            <option value="&category=31">
              Entertainment: Japanese Anime & Manga
            </option>
            <option value="&category=32">
              Entertainment: Cartoon & Animations
            </option>
          </select>
          <h3>Difficulty</h3>
          <select id="difficulty">
            <option value="">Any Difficulty</option>
            <option value="&difficulty=easy">Easy</option>
            <option value="&difficulty=medium">Medium</option>
            <option value="&difficulty=hard">Hard</option>
          </select>
          <button className="menu-button" onClick={startGame}>
            Start Quiz
          </button>
        </div>
      )}
      {game && (
        <div>
          <h4 className="menu-author">Developed by: Marco Ribeiro (ReactJS)</h4>
          <App
            startGame={startGame}
            game={game}
            questionsAmount={amount}
            questionsCategory={category}
            questionsDifficulty={difficulty}
            htmlDecoder={(string) => htmlDecoder(string)}
          />
        </div>
      )}
    </div>
  );
}
