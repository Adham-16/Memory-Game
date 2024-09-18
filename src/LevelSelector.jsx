export function LevelSelector({ setLevel }) {
  return (
    <div className="flex justify-center space-x-4 mb-4">
      <button onClick={() => setLevel(1)} className="btn">Level 1</button>
      <button onClick={() => setLevel(2)} className="btn">Level 2</button>
      <button onClick={() => setLevel(3)} className="btn">Level 3</button>
    </div>
  );
}
