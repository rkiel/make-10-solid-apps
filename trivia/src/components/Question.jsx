const sampleAnswers = ["One", "Two", "Three", "Four"];

function buttonTag(answer, index) {
  return <button key={index}>{answer}</button>;
}
export default function Question() {
  return (
    <div className="question">
      <h2>Question Here</h2>
      <For each={sampleAnswers}>{buttonTag}</For>
    </div>
  );
}
