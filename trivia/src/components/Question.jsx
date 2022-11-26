import shuffle from "lodash.shuffle";

function buttonTag(answer, index) {
  return <button key={index}>{answer}</button>;
}
export default function Question(props) {
  const question = props.question;
  const answers = shuffle(
    [question.correct_answer].concat(question.incorrect_answers)
  );

  return (
    <div className="question">
      <h2 innerHTML={question.question} />
      <For each={answers}>{buttonTag}</For>
    </div>
  );
}
