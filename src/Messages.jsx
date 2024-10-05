import { useEffect } from "react";

export function Messages({stage,setStage,gameOver,message,cards,revealedCount,setMessage,setIsRunning,initGame }) {

    // Check for progress updates
  useEffect(() => {
    const totalCards = cards.length;
    const quarter = Math.floor(totalCards / 4);
    const half = Math.floor(totalCards / 2);

    // Only show progress messages when at least one pair is revealed
    if (revealedCount > 0) {
      if (revealedCount === totalCards) {
        setMessage("I knew you’d smash it! Straight up, you're the boss, no cap!");
        setIsRunning(false); // Stop the timer when the game is completed
        if (stage && stage === 1) {
          setStage(2);
          initGame(8, 60);
        }else if (stage && stage === 2) {
          setStage(3);
          initGame(12, 120);
        }
        navigator.vibrate([200,100,200])
      } else if (revealedCount >= half) {
        setMessage("You’re on the edge, man! Could go either way, so hustle up!");
        navigator.vibrate(100)
      } else if (revealedCount >= quarter) {
        setMessage("Yo, you're killin' it, but don't get cocky! Still got a long road ahead, bro!");
        navigator.vibrate(100)
      }
    }
  }, [revealedCount, cards.length]);
 
  return (
    <>
     {/* Game over message */}
      {gameOver && (
        <div className="text-red-500 text-lg text-center sm:text-3xl mb-4">
          Time is up! You have lost. Try again!
        </div>
      )}

      {/* Show progress message */}
      {!gameOver && message && (
        <div className="text-[#35b08b] text-center text-base sm:text-2xl mb-4">{message}</div>
      )}
    </>
  );
}
