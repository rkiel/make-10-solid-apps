import { createSignal, onMount, onCleanup } from "solid-js";

export default function useMovement() {
  const [x, setX] = createSignal(0);
  const [y, setY] = createSignal(0);
  const [direction, setDirection] = createSignal("down");

  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
  });
  onCleanup(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });

  function handleKeyDown(e) {
    switch (e.key) {
      case "ArrowUp":
        move("up");
        break;
      case "ArrowLeft":
        move("left");
        break;
      case "ArrowDown":
        move("down");
        break;
      case "ArrowRight":
        move("right");
        break;
    }
  }

  function move(dir) {
    setDirection(dir);
    if (dir === "up") setY(y() - 20);
    if (dir === "left") setX(x() - 20);
    if (dir === "down") setY(y() + 20);
    if (dir === "right") setX(x() + 20);
  }

  return { x, y, direction, move };
}
