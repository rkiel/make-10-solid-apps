import { createSignal } from "solid-js";
import s from "./App.module.css";

function Tab(props) {
  const [left, setLeft] = createSignal(0);
  const [opacity, setOpacity] = createSignal(0);
  const hightlightStyle = () => ({
    left: `${left()}px`,
    opacity: `${opacity()}`,
  });

  function mouseMove(e) {
    setLeft(e.layerX - 150); // half of width 300
  }
  function mouseIn() {
    setOpacity(0.8);
  }
  function mouseOut() {
    setOpacity(0);
  }

  return (
    <div
      class={s.tab}
      onMouseEnter={mouseIn}
      onMouseOut={mouseOut}
      onMouseMove={mouseMove}
    >
      <div class={s.highlight} style={hightlightStyle()} />
      {props.children}
    </div>
  );
}
function App() {
  return (
    <div class={s.app}>
      <div class={s.browser}>
        <div class={s.tabs}>
          <Tab>
            <a>Home</a>
          </Tab>
          <Tab>
            <a>About</a>
          </Tab>
          <Tab>
            <a>Features</a>
          </Tab>
        </div>

        <div class={s.viewport}>Pages Go Here</div>
      </div>
    </div>
  );
}

export default App;
