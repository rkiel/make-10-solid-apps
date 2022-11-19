import s from "../App.module.css";
import { A } from "@solidjs/router";

import Tab from "./Tab.jsx";

export default function Header() {
  return (
    <div class={s.tabs}>
      <Tab>
        <A href="/" activeClass={s.isActive} end="true">
          Home
        </A>
      </Tab>
      <Tab>
        <A href="/about" activeClass={s.isActive}>
          About
        </A>
      </Tab>
      <Tab>
        <A href="/features" activeClass={s.isActive}>
          Features
        </A>
      </Tab>
    </div>
  );
}
