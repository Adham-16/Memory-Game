import { useState, useEffect } from "react";
import { Card } from "./Card";
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState();
  const [secondCard, setSecondCard] = useState();
  const [disabled, setDisabled] = useState(false);
  const [turn, setTurn] = useState(0);
  const [stage, setStage] = useState(0); // Current level
  const [time, setTime] = useState(60); // Default 60 seconds for level 1
  const [isRunning, setIsRunning] = useState(false); // Control timer state
  const [gameOver, setGameOver] = useState(false); // Track if game is lost
  const [revealedCount, setRevealedCount] = useState(0); // Track revealed cards
  const [message, setMessage] = useState(""); // Message for progress updates

  // Initialize the game with shuffled cards and set the timer based on level
  const initGame = (pairs, levelTime) => {
    const cards = new Array(pairs * 2)
      .fill()
      .map((_, index) => ({
        src: `/pix/${index % pairs + 1}.jpg`,
        revealed: false,
      }));

    // Shuffle cards using Fisher-Yates algorithm
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    setTimeout(() => setCards(cards), 300);
    setTurn(0);
    setFirstCard();
    setSecondCard();
    setTime(levelTime); // Set time limit based on level
    setIsRunning(true); // Start timer
    setGameOver(false); // Reset game over status
    setRevealedCount(0); // Reset revealed cards count
    setMessage(""); // Reset progress message
  };

  // Timer logic: Decrement time every second if the timer is running
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      setGameOver(true); // Player loses when time runs out
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  // Update revealed cards logic
  const updateRevealedCard = (index) => {
    if (disabled || gameOver) return; // Disable interaction if game is over
    setTurn(turn + 1);
    if (firstCard !== undefined) setSecondCard(index);
    else setFirstCard(index);
  };

  // Reset selection
  function reset() {
    setFirstCard();
    setSecondCard();
    setDisabled(false);
  }

  // Check for match or reset after a wrong attempt
  useEffect(() => {
    if (firstCard !== undefined && secondCard !== undefined) {
      setDisabled(true);
      if (cards[firstCard].src === cards[secondCard].src) {
        const updatedCards = cards.map((card, i) => ({
          ...card,
          revealed: card.revealed || i === firstCard || i === secondCard,
        }));
        setCards(updatedCards);

        // Increase revealed count by 2 when a match is found
        setRevealedCount(revealedCount + 2);

        reset();
      } else {
        setTimeout(reset, 1000);
      }
    }
  }, [firstCard, secondCard]);

  // Check for progress updates
  useEffect(() => {
    const totalCards = cards.length;
    const quarter = Math.floor(totalCards / 4);
    const half = Math.floor(totalCards / 2);

    // Only show progress messages when at least one pair is revealed
    if (revealedCount > 0) {
      if (revealedCount === totalCards) {
        setMessage("Well done, you have completed this round!");
        setIsRunning(false); // Stop the timer when the game is completed
      } else if (revealedCount >= half) {
        setMessage("You've completed half of the cards!");
      } else if (revealedCount >= quarter) {
        setMessage("You've completed a quarter of the cards!");
      }
    }
  }, [revealedCount, cards.length]);

  // Restart the game with the selected level
  const handleNewGame = (level) => {
    if (level === 1) {
      setStage(1);
      initGame(4, 60); // 4 pairs, 1 minute
    } else if (level === 2) {
      setStage(2);
      initGame(8, 120); // 8 pairs, 2 minutes
    } else if (level === 3) {
      setStage(3);
      initGame(12, 180); // 12 pairs, 3 minutes
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      {/* Level selection buttons */}
      <div className="flex gap-4 mb-4">
        <button onClick={() => handleNewGame(1)} className="btn">Level 1 (Easy)</button>
        <button onClick={() => handleNewGame(2)} className="btn">Level 2 (Medium)</button>
        <button onClick={() => handleNewGame(3)} className="btn">Level 3 (Hard)</button>
      </div>

      {/* Game over message */}
      {gameOver && (
        <div className="text-red-500 text-3xl mb-4">
          Time's up! You lost. Try again!
        </div>
      )}

      {/* Show progress message */}
      {!gameOver && message && (
        <div className="text-[#35b08b] text-2xl mb-4">{message}</div>
      )}

      {/* Only show cards and timer if the game is not over */}
      {!gameOver && stage > 0 && (
        <>
          <div className="grid place-content-center grid-cols-4 xl:grid-cols-8 gap-2">
            {cards?.map((card, i) => (
              <Card
                key={i}
                card={card}
                index={i}
                updateRevealedCard={updateRevealedCard}
                isRevealed={card.revealed || i === firstCard || i === secondCard}
              />
            ))}
          </div>

          {/* Display timer and turn count */}
          <div className="flex items-baseline justify-between w-1/2 mx-16 my-6">
            <button onClick={() => handleNewGame(stage)} className="btn">Restart Level</button>
            <p className="text-[#35b08b] text-2xl">Turn: {turn}</p>
            <p className="text-[#35b08b] text-2xl">Time Left: {time}s</p> {/* Display countdown timer */}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
