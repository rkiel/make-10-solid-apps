import { onMount, createSignal } from "solid-js";
import "./App.css";
import Question from "./components/Question";
import CategorySelector from "./components/CategorySelector";
import ResultModal from "./components/ResultModal";
import Scoreboard from "./components/Scoreboard";

async function getQuestion() {
  const url = "https://opentdb.com/api.php?amount=1";

  const response = await fetch(url);
  const data = await response.json();
  return data.results[0];
}

function App() {
  const [question, setQuestion] = createSignal(null);

  onMount(async () => {
    const result = await getQuestion();
    setQuestion(result);
  });

  return (
    <div className="app">
      {/* show the result modal ----------------------- */}
      {/* <ResultModal /> */}

      {/* question header ----------------------- */}
      <div className="question-header">
        <CategorySelector />
        <Scoreboard />
      </div>

      {/* the question itself ----------------------- */}
      <div className="question-main">
        <Show when={question()}>
          <Question question={question()} />
        </Show>
      </div>

      {/* question footer ----------------------- */}
      <div className="question-footer">
        <button>Go to next question 👉</button>
      </div>
    </div>
  );
}

export default App;
