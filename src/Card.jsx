export function Card({ card, index, updateRevealedCard, isRevealed }) {
  function handleClick() {
    updateRevealedCard(index);
  }

  return (
    <div className={`card ${isRevealed ? 'is-revealed' : ''}`} onClick={handleClick}>
      <div className="card-face">
        <img className="w-[90px] sm:w-[120px] xl:w-[150px] mb-2" alt="card-face" src={card.src} />
      </div>
      <div className="card-back">
        <img className="w-[90px] sm:w-[120px] xl:w-[150px] mb-2" alt="card-back" src="/pix/16.jpg" />
      </div>
    </div>
  );
}
