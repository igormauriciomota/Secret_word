// CSS
import './App.css';

// Reactimport { useCallback, useEffect, useState } from 'react';
import { useState } from 'react';

// data
import { wordsList } from './data/words';

// components
import Game from './components/Game';
import GameOver from './components/GameOver';
import StartScreen from './components/StartScreen';

// 3 estagios do jogo
const stages = [
  {id: 1, name: "start" },
  {id: 2, name: "game" },
  {id: 3, name: "end" },
];

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  //Escolhendo as palavras iniciais do project
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(5)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = () => {
    const categories = Object.keys(words)
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

      console.log(category);
      // pick a random word
      const word = words[category][Math.floor(Math.random() * words[category].length)];

      console.log(word);

      return { word, category };
  };
  
  // starts the secret word game
  //inicia o jogo de palavras secretas
  const startGame = () => {

    //pick word and pick category / escolha a palavra e escolha a categoria
    const { word, category } = pickWordAndCategory();

    // create an array of letters
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((l) => l.toLowerCase());


    //console.log(word, category);
    //console.log(wordLetters);

    //fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);


    setGameStage(stages[1].name);

  };

  // process the letter input
  // processar a entrada da letra

  const verifyLetter = (letter) => {
      
      const normalizedLetter = letter.toLowerCase();

      // check if letter has alteready been used
      // verifique se a letra já foi utilizada
      if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
      ) {
        return;
    }

    // push guessed letter or remove a guess
    // empurre a letra adivinhada ou remova um palpite
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])
    }

    console.log(guessedLetters);
    console.log(wrongLetters);

  };

  // restarts the game / reinicia o jogo

  const retry = () => {
    setGameStage(stages[0].name);
  };

  return (
    <div className="App">
      {/* Inicio */}

      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && (<Game
      verifyLetter={verifyLetter}
      pickedWord={pickedWord}
      pickedCategory={pickedCategory}
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
      />
      )}
      {gameStage === 'end' && <GameOver retry={retry} />}

      {/* Fim */}
    </div>
  );
}

export default App;

