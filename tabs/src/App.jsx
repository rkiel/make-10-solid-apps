import s from "./App.module.css";

import Header from "./components/Header.jsx";
import AppRoutes from "./AppRoutes.jsx";

function App() {
  return (
    <div class={s.app}>
      <div class={s.browser}>
        <Header />
        <div class={s.viewport}>
          <AppRoutes />
        </div>
      </div>
    </div>
  );
}

export default App;
