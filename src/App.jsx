import { useState, useEffect } from "react";
import { Card } from "./Card";
import './App.css';
import { LevelSelector } from "./LevelSelector";
import { Messages } from "./Messages";
import { Timer } from "./Timer";

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

  return (
    <div className="flex flex-col items-center mt-10">

      {/* Level selection buttons */}
      <LevelSelector initGame={initGame} setStage={setStage} stage={stage}/>

      {/* Game over message && Show progress message */}
      <Messages gameOver={gameOver} message={message} cards={cards} revealedCount={revealedCount} setMessage={setMessage} setIsRunning={setIsRunning} />
      
      {/* Only show cards and timer if the game is not over */}
      {!gameOver && stage > 0 && (
        <>
          <div className="grid place-content-center grid-cols-4 xl:grid-cols-8 gap-2">
            {cards?.map((card, i) => (
              <Card key={i} card={card} index={i} updateRevealedCard={updateRevealedCard} isRevealed={card.revealed || i === firstCard || i === secondCard} />
            ))}
          </div>

          {/* Display timer and turn count */}
          <div className="flex items-baseline justify-between w-4/5 sm:w-1/2 mx-5 my-2 sm:mx-16 sm:my-3">
            <p className="text-[#35b08b] text-base sm:text-2xl">Turn: {turn}</p>
            <Timer isRunning={isRunning}  time={time}  setTime={setTime}  setIsRunning={setIsRunning}  setGameOver={setGameOver} />
          </div>
        </>
      )}
    </div>
  );  
}

export default App;
