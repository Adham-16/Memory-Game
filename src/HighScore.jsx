import { useEffect } from "react";

export function HighScore({ revealedCount, cards, stage, time, turn,isRunning }) {
  useEffect(() => {
    
      const timeTurnStorage = JSON.parse(localStorage.getItem(`Best-Time&turn-${stage}`));

      if (timeTurnStorage == null && revealedCount > 0 && cards.length === revealedCount) {
      const highScoreData = { time,turn };
      localStorage.setItem(`Best-Time&turn-${stage}`, JSON.stringify(highScoreData));
      
      }else if (timeTurnStorage !== null && revealedCount > 0 && cards.length === revealedCount) {
        const bestTime = Math.max(timeTurnStorage.time, time);
        const bestTurn = Math.min(timeTurnStorage.turn, turn);
        const highScoreData = { time: bestTime,turn:bestTurn };
        localStorage.setItem(`Best-Time&turn-${stage}`, JSON.stringify(highScoreData));
      
      }}, [revealedCount, cards]);

  // Function to retrieve high scores for each level
  const getHighScores = (level) => {
    const data = JSON.parse(localStorage.getItem(`Best-Time&turn-${level}`));
    return data ? { time: data.time, turn: data.turn } : { time: 'N/A', turn: 'N/A' };
  };

  const level1Scores = getHighScores(1);
  const level2Scores = getHighScores(2);
  const level3Scores = getHighScores(3);

  return (
    <>
    {revealedCount > 0 && cards.length === revealedCount &&
    <div className="my-4 text-white text-sm sm:text-xl">Your score    {'time:  ' + time + '   turn: '+ turn }</div>
    }
    {!isRunning &&
      <table className="w-60 border-collapse border border-green-800 bg-green-700 text-white mb-3">
      <thead>
        <tr>
          <th colSpan="3" className="p-4 text-lg font-bold">Best High Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-green-800 p-2 text-lg">Stage</td>
          <td className="border border-green-800 p-2 text-lg">Time</td>
          <td className="border border-green-800 p-2 text-lg">Turn</td>
        </tr>
        <tr>
          <td className="border border-green-800 p-2">Level 1</td>
          <td className="border border-green-800 p-2">{level1Scores.time !== 'N/A' ? level1Scores.time : 'N/A'}</td>
          <td className="border border-green-800 p-2">{level1Scores.turn !== 'N/A' ? level1Scores.turn : 'N/A'}</td>
        </tr>
        <tr>
          <td className="border border-green-800 p-2">Level 2</td>
          <td className="border border-green-800 p-2">{level2Scores.time !== 'N/A' ? level2Scores.time : 'N/A'}</td>
          <td className="border border-green-800 p-2">{level2Scores.turn !== 'N/A' ? level2Scores.turn : 'N/A'}</td>
        </tr>
        <tr>
          <td className="border border-green-800 p-2">Level 3</td>
          <td className="border border-green-800 p-2">{level3Scores.time !== 'N/A' ? level3Scores.time : 'N/A'}</td>
          <td className="border border-green-800 p-2">{level3Scores.turn !== 'N/A' ? level3Scores.turn : 'N/A'}</td>
        </tr>
      </tbody>
    </table>}
    </>
  );
}




// chatgpt answer
// chatgpt answer

  // useEffect(() => {
  //   if (revealedCount > 0 && cards.length === revealedCount) {
  //     // Retrieve the existing high score data
  //     const existingData = JSON.parse(localStorage.getItem(`Best-Time&turn-${stage}`)) || { time: Infinity, turn: Infinity };

  //     // Check and update if the new time or turn is better
  //     const bestTime = Math.max(existingData.time, time);
  //     const bestTurn = Math.min(existingData.turn, turn);
  //     console.log(turn);
  //     console.log(existingData.turn);
      
  //     console.log(bestTime);
  //     console.log(bestTurn);
      
  //     // Create updated high score data
  //     const highScoreData = { time: bestTime, turn: bestTurn };

  //     // Store the updated high scores in localStorage
  //     localStorage.setItem(`Best-Time&turn-${stage}`, JSON.stringify(highScoreData));
  //   }
  // }, [revealedCount, cards, stage, time, turn]);
