import logo from "./logo.svg";
import styles from "./App.module.css";

import { createSignal } from "solid-js";

import { timeLeft, minutes, seconds, start, stop, init } from "./timer.js";

function App() {
  const [title, setTitle] = createSignal("Let the countdown begin!!!");
  const [isRunning, setIsRunning] = createSignal(false);

  function startTimer() {
    start();
    setTitle("You're doing great!");
    setIsRunning(true);
  }
  function stopTimer() {
    stop();
    setTitle("Keep it up!");
    setIsRunning(false);
  }
  function resetTimer() {
    stop();
    setTitle("Ready to go another round?");
    setIsRunning(false);
    init(15 * 60);
  }

  init(10 * 60);

  return (
    <div>
      <h2>{title()}</h2>
      <div>
        <span>{minutes()}</span>
        <span>:</span>
        <span>{seconds()}</span>
      </div>

      <div>
        <Show when={!isRunning()}>
          <button onClick={startTimer}>Start</button>
        </Show>
        <Show when={isRunning()}>
          <button onClick={stopTimer}>Stop</button>
        </Show>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default App;
