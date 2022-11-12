import { createSignal } from "solid-js";

const [lastInterval, setLastInterval] = createSignal(null);
export const [timeLeft, setTimeLeft] = createSignal(0);
export const minutes = () => padTime(Math.floor(timeLeft() / 60));
export const seconds = () => padTime(timeLeft() - minutes() * 60);

function padTime(time) {
  return time.toString().padStart(2, "0");
}

export function init(time) {
  setTimeLeft(time);
}

export function start() {
  if (!lastInterval()) {
    const interval = setInterval(() => {
      const t = timeLeft();
      if (t > 0) {
        setTimeLeft(t - 1);
      } else {
        setTimeLeft(0);
      }
    }, 1000);

    setLastInterval(interval);
  }
}

export function stop() {
  if (lastInterval()) {
    clearInterval(lastInterval());
  }
  setLastInterval(null);
}

export default {
  timeLeft,
  //setTimeLeft,
  minutes,
  seconds,
  start,
  stop,
};
