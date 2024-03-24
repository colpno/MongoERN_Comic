/* eslint-disable no-unused-vars */
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * @param {number} initialTime in milliseconds
 * @param {boolean} compareToCurrentTime enable if initialTime is a date string before converting to milliseconds
 */
function useCountdown({
  initialTime,
  autoStartCountdown = false,
  onExpired = () => {},
  compareToCurrentTime = false,
  format = "mm:ss",
}) {
  const expiredCountdownRef = useRef(null);
  const [countdownTime, setCountdownTime] = useState(initialTime);
  const [isExpired, setIsExpired] = useState(true);

  const stopCountdown = () => {
    clearInterval(expiredCountdownRef.current);
  };

  const clearCountdown = () => {
    stopCountdown();
    setCountdownTime(initialTime);
  };

  const startCountdown = useCallback(() => {
    setIsExpired(false);

    expiredCountdownRef.current = setInterval(() => {
      if (compareToCurrentTime) {
        const duration = moment(initialTime).diff(moment());
        setCountdownTime(duration);
      } else {
        setCountdownTime((prev) => {
          const duration = moment.duration(moment(prev)).subtract(1, "second").asMilliseconds();
          return duration;
        });
      }
    }, 1000);
  }, [expiredCountdownRef, setCountdownTime, initialTime]);

  useEffect(() => {
    const expired = countdownTime && countdownTime <= 0;

    if (expired) {
      setIsExpired(true);
      clearCountdown();
      onExpired();
    }
  }, [countdownTime, clearCountdown, onExpired]);

  useEffect(() => {
    if (autoStartCountdown) {
      startCountdown();
    }

    return () => {
      clearCountdown();
    };
  }, [autoStartCountdown, startCountdown]);

  return {
    countdownTime: countdownTime ? moment(countdownTime).format(format) : undefined,
    isExpired,
    startCountdown,
    stopCountdown,
    clearCountdown,
  };
}

export default useCountdown;
