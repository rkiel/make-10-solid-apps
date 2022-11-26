import { createEffect, createSignal } from "solid-js";
import "./App.css";
import Question from "./components/Question";
import CategorySelector from "./components/CategorySelector";
import ResultModal from "./components/ResultModal";
import Scoreboard from "./components/Scoreboard";

async function getTrivia(category) {
  const params = [`amount=${1}`];
  if (category !== "any") {
    params.push(`category=${category}`);
  }
  const url = `https://opentdb.com/api.php?${params.join("&")}`;

  const response = await fetch(url);
  const data = await response.json();
  return data.results[0];
}

function App() {
  const [question, setQuestion] = createSignal(null);
  const [selectedCategory, setSelectedCategory] = createSignal("any");

  createEffect(async () => {
    const trivia = await getTrivia(selectedCategory());
    setQuestion(trivia);
  });

  return (
    <div className="app">
      {/* show the result modal ----------------------- */}
      {/* <ResultModal /> */}

      {/* question header ----------------------- */}
      <div className="question-header">
        <CategorySelector
          category={selectedCategory()}
          chooseCategory={setSelectedCategory}
        />
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
