export function LevelSelector({setStage,initGame,stage}) {

   // Restart the game with the selected level
  function handleNewGame (level) {
    if (level === 1) {
      setStage(1);
      initGame(4, 30); // 4 pairs, 1 minute
    } else if (level === 2) {
      setStage(2);
      initGame(8, 90); // 8 pairs, 2 minutes
    } else if (level === 3) {
      setStage(3);
      initGame(12, 150); // 12 pairs, 3 minutes
    }
  };

  return (
    <>
    <div className="flex gap-4 mb-4">         
        <button onClick={() => handleNewGame(1)} className="btn">Level 1</button>
        <button onClick={() => handleNewGame(2)} className="btn">Level 2</button>
        <button onClick={() => handleNewGame(3)} className="btn">Level 3</button>
        { stage > 0 &&
        <button onClick={() => handleNewGame(stage)} className="btn bg-[#35B08B]">Restart Level</button>
        }
      </div>
    </>
  )
}
