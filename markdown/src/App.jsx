import logo from "./logo.svg";
import styles from "./App.module.css";

import { createSignal } from "solid-js";
import Markdown from "./Markdown.jsx";

function App() {
  const [text, setText] = createSignal("# sup");

  function onInput(e) {
    setText(e.target.value);
  }

  return (
    <div>
      <textarea onInput={onInput} value={text()} />
      <Markdown md={text()} />
    </div>
  );
}

export default App;
