import { useEffect } from 'react';

export function Timer({ isRunning,time,setTime,setIsRunning,setGameOver }) {


  // Timer logic: Decrement time every second if the timer is running
  useEffect(() => {
    let timer;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsRunning(false);
      setGameOver(true); // Player loses when time runs out
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);


  return (
    <>
    {/* Display countdown timer */}
    <p className="text-[#35b08b] text-base sm:text-2xl">Time Left: {time}s</p> 
    </>
    

  );
}
