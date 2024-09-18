import { Card } from './Card';

export function GameBoard({ cards, firstCard, secondCard, updateRevealedCard }) {
  return (
    <div className="grid grid-cols-4 xl:grid-cols-8 gap-2">
      {cards.map((card, i) => (
        <Card key={i} card={card} index={i} updateRevealedCard={updateRevealedCard} isRevealed={card.revealed || i === firstCard || i === secondCard} />
      ))}
    </div>
  );
}
