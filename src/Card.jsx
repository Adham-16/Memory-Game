export function Card({ card, index, updateRevealedCard, isRevealed }) {
  function handleClick() {
    updateRevealedCard(index);
  }

  return (
    <div className={`card ${isRevealed ? 'is-revealed' : ''}`} onClick={handleClick}>
      <div className="card-face">
        <img className="w-full h-3/4" loading="lazy" alt="card-face" src={card.src} />
      </div>
      <div className="card-back">
        <img className="w-full h-3/4 " loading="lazy" alt="card-back" src="/pix/16.avif" />
      </div>
    </div>
  );
}
