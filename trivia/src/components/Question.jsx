import shuffle from "lodash.shuffle";

function buttonTag(answer, index) {
  return <button key={index} innerHTML={answer} />;
}

function answers(q) {
  return shuffle([q.correct_answer].concat(q.incorrect_answers));
}

export default function Question(props) {
  const question = () => props.question;

  return (
    <div className="question">
      <h2 innerHTML={question().question} />
      <For each={answers(question())}>{buttonTag}</For>
    </div>
  );
}
