import { useEffect } from "react";

export function Messages({ gameOver,message,cards,revealedCount,setMessage,setIsRunning }) {

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
        navigator.vibrate([200,100,200])
      } else if (revealedCount >= half) {
        setMessage("You've completed half of the cards!");
        navigator.vibrate(100)
      } else if (revealedCount >= quarter) {
        setMessage("You've completed a quarter of the cards!");
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
