import { createSignal, createEffect } from "solid-js";
import logo from "./logo.svg";
import "./App.css";

import Rock from "./icons/Rock";
import Paper from "./icons/Paper";
import Scissors from "./icons/Scissors";

const rock = { id: 1, name: "rock", component: Rock, losesTo: [2] };
const paper = { id: 2, name: "paper", component: Paper, losesTo: [3] };
const scissors = { id: 3, name: "scissors", component: Scissors, losesTo: [1] };
const choices = [rock, paper, scissors];
const [gameState, setGameState] = createSignal(null);

function App() {
  const [wins, setWins] = createSignal(0);
  const [losses, setLosses] = createSignal(0);
  const [userChoice, setUserChoice] = createSignal(null);
  const [computerChoice, setComputerChoice] = createSignal(null);

  function renderComponent(choice) {
    if (choice) {
      const Component = choice.component;
      return <Component />;
    }
  }
  function handleUserChoice(id) {
    const choice = choices.find((c) => c.id === id);
    setUserChoice(choice);
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
    if (choice.losesTo.includes(randomChoice.id)) {
      setLosses(losses() + 1);
      setGameState("lose");
    } else if (randomChoice.losesTo.includes(choice.id)) {
      setWins(wins() + 1);
      setGameState("win");
    } else if (randomChoice.id === choice.id) {
      setGameState("draw");
    }
  }

  function restartGame() {
    setGameState(null);
    setUserChoice(null);
  }

  return (
    <div class="app">
      {/* information goes here */}
      <div class="info">
        <h2>Rock. Paper. Scissors</h2>

        {/* wins vs losses stats */}
        <div class="wins-losses">
          <div class="wins">
            <span class="number">{wins()}</span>
            <span class="text">Win{wins() === 1 ? "" : "s"}</span>
          </div>

          <div class="losses">
            <span class="number">{losses()}</span>
            <span class="text">Loss{losses() === 1 ? "" : "es"}</span>
          </div>
        </div>
      </div>

      {/* the popup to show win/loss/draw */}
      <Show when={gameState()}>
        <div class={`game-state ${gameState()}`} onClick={restartGame}>
          <div>
            <div class="game-state-content">
              <p>{renderComponent(userChoice())}</p>
              <p>You {gameState()}</p>
              <p>{renderComponent(computerChoice())}</p>
            </div>
            <button>Play Again</button>
          </div>
        </div>
      </Show>

      <div class="choices">
        {/* choices captions */}
        <div>You</div>
        <div />
        <div>Computer</div>

        {/* buttons for my choice */}
        <div>
          <button class="rock" onClick={() => handleUserChoice(rock.id)}>
            <Rock />
          </button>
          <button class="paper" onClick={() => handleUserChoice(paper.id)}>
            <Paper />
          </button>
          <button
            class="scissors"
            onClick={() => handleUserChoice(scissors.id)}
          >
            <Scissors />
          </button>
        </div>

        <div class="vs">vs</div>

        {/* show the computer's choice */}
        <div>
          <button class="computer-choice">?</button>
        </div>
      </div>
    </div>
  );
}

export default App;
