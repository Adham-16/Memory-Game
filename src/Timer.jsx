import { useEffect } from 'react';

export function Timer({ timeLeft, setTimeLeft, onTimeout }) {
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      onTimeout();
    }
  }, [timeLeft]);

  return (
    <div className="text-center">
      <p>Time Left: {timeLeft} seconds</p>
    </div>
  );
}
