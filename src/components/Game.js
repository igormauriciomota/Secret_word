import './Game.css';

const Game = ({
    verifyLetter,
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLetters,
    guesses,
    score,
}) => {
    return (
        <div className="game">
            <p className='point'>
                <span>Pontuação: {score}</span>
            </p>
            <h1>Adivinhe a palavra:</h1>
            <h3 className="tip">
                Dica sobre a palavra: <span>{pickedCategory}</span>
            </h3>
            <p>Você ainda tem {guesses} tentativa</p>
            <div className="wordContainer">
                {letters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span kei={i} className="letter">
                        {letter}
                        </span>
                ) : (
                        <span kei={i} className="blankSquare">

                        </span>
                )
            ))}
            </div>

            <div className="letterContainer">
                <p>Tente advinhar uma letra da palavra:</p>
                <form>
                    <input type="text" name='letter' maxLength="1" required />
                    <button>Jogar!</button>
                </form>
            </div>
            <div className="wrongLettersContainer">
                <p>Letras já utilizadas: </p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>{letter}, </span>
                ))}
            </div>
        </div>
    );
};

export default Game;

