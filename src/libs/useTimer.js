import { useState, useEffect, useRef } from "react";

const useTimer = (timerKey = "remainingSeconds") => {
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    setTimerSeconds(120);
  };

  const resetTimer = () => {
    setTimerSeconds(0);
  };

  useEffect(() => {
    const remainingSeconds = localStorage.getItem(timerKey);
    if (remainingSeconds) {
      const parsedSeconds = parseInt(remainingSeconds, 10);
      if (!isNaN(parsedSeconds) && parsedSeconds > 0 && parsedSeconds <= 120) {
        setTimerSeconds(parsedSeconds);
      }
    }
  }, [timerKey]);

  useEffect(() => {
    const tick = () => {
      setTimerSeconds((prevSeconds) => Math.max(0, prevSeconds - 1));
    };

    if (timerSeconds > 0) {
      timerRef.current = setInterval(tick, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [timerSeconds]);

  useEffect(() => {
    localStorage.setItem(timerKey, timerSeconds.toString());
  }, [timerKey, timerSeconds]);

  return { timerSeconds, startTimer, resetTimer };
};

export default useTimer;