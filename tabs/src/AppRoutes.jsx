import { lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";

const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Features = lazy(() => import("./pages/Features.jsx"));

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/about" component={About} />
      <Route path="/features" component={Features} />
      <Route path="/" component={Home} />
    </Routes>
  );
}
