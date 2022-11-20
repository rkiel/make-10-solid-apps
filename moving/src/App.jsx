import { onMount, onCleanup, createEffect, createSignal } from "solid-js";
import "./App.css";

function App() {
  const [x, setX] = createSignal(0);
  const [y, setY] = createSignal(0);

  let canvas;

  onMount(() => {
    const context = canvas.getContext("2d");
    context.canvas.height = window.innerHeight;
    context.canvas.width = window.innerWidth;
  });
  createEffect(() => {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, window.innerHeight, window.innerWidth);
    context.fillRect(x(), y(), 100, 100);
  });
  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
  });
  onCleanup(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });

  function moveUp() {
    setY(y() - 20);
  }
  function moveDown() {
    setY(y() + 20);
  }
  function moveLeft() {
    setX(x() - 20);
  }
  function moveRight() {
    setX(x() + 20);
  }

  function handleKeyDown(e) {
    switch (e.key) {
      case "ArrowUp":
        moveUp();
        break;
      case "ArrowLeft":
        moveLeft();
        break;
      case "ArrowDown":
        moveDown();
        break;
      case "ArrowRight":
        moveRight();
        break;
    }
  }

  return (
    <div className="app">
      <canvas ref={canvas} />

      <div className="arrows">
        <button onClick={moveUp}>Up</button>
        <button onClick={moveLeft}>Left</button>
        <button onClick={moveDown}>Down</button>
        <button onClick={moveRight}>Right</button>
      </div>

      <div className="images">
        <img src="https://i.imgur.com/JYUB0m3.png" alt="Down" />
        <img src="https://i.imgur.com/GEXD7bk.gif" alt="Right" />
        <img src="https://i.imgur.com/XSA2Oom.gif" alt="Up" />
        <img src="https://i.imgur.com/4LGAZ8t.gif" alt="Left" />
      </div>
    </div>
  );
}

export default App;
