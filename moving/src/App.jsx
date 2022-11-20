import { onMount, createEffect } from "solid-js";
import "./App.css";

import useMovement from "./useMovement";

function App() {
  const { x, y, direction, move } = useMovement();

  let canvas;
  let linkDown, linkLeft, linkRight, linkUp;

  onMount(() => {
    console.log("USE http://localhost:3000");
    const context = canvas.getContext("2d");
    context.canvas.height = window.innerHeight;
    context.canvas.width = window.innerWidth;
  });
  createEffect(() => {
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, window.innerHeight, window.innerWidth);
    switch (direction()) {
      case "up":
        context.drawImage(linkUp, x(), y());
        break;
      case "down":
        context.drawImage(linkDown, x(), y());
        break;
      case "left":
        context.drawImage(linkLeft, x(), y());
        break;
      case "right":
        context.drawImage(linkRight, x(), y());
        break;
    }
  });

  return (
    <div className="app">
      <canvas ref={canvas} />

      <div className="arrows">
        <button onClick={() => move("up")}>Up</button>
        <button onClick={() => move("left")}>Left</button>
        <button onClick={() => move("down")}>Down</button>
        <button onClick={() => move("right")}>Right</button>
      </div>

      <div className="images">
        <img ref={linkDown} src="https://i.imgur.com/JYUB0m3.png" alt="Down" />
        <img
          ref={linkRight}
          src="https://i.imgur.com/GEXD7bk.gif"
          alt="Right"
        />
        <img ref={linkUp} src="https://i.imgur.com/XSA2Oom.gif" alt="Up" />
        <img ref={linkLeft} src="https://i.imgur.com/4LGAZ8t.gif" alt="Left" />
      </div>
    </div>
  );
}

export default App;
