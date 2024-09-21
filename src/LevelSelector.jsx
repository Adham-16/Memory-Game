export function LevelSelector({setStage,initGame,stage}) {

   // Restart the game with the selected level
  function handleNewGame (level) {
    if (level === 1) {
      setStage(1);
      initGame(4, 30); // 4 pairs, 0.5 minute
    } else if (level === 2) {
      setStage(2);
      initGame(8, 60); // 8 pairs, 1 minutes
    } else if (level === 3) {
      setStage(3);
      initGame(12, 120); // 12 pairs, 2 minutes
    }
  };

  return (
    <>
    <div className="flex flex-col items-center gap-4 mb-4">
    {!stage &&<p className="text-[#35b08b] text-center text-base sm:text-2xl mb-4">Please choose the level to start the game</p>}         
      <div className="flex gap-4 mb-4">
        <button onClick={() => handleNewGame(1)} className="btn">Level 1</button>
        <button onClick={() => handleNewGame(2)} className="btn">Level 2</button>
        <button onClick={() => handleNewGame(3)} className="btn">Level 3</button>
        { stage > 0 &&
        <button onClick={() => handleNewGame(stage)} className="btn bg-[#35B08B]">Restart Level</button>
        }
      </div>
        
      </div>
    </>
  )
}
