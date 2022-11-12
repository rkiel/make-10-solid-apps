import { marked } from "marked";

export default function Markdown(props) {
  return <div innerHTML={marked(props.md)}></div>;
}
