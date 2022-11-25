import { createSignal, createEffect } from "solid-js";

import "./App.css";

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

async function getPhotos(p) {
  const response = await fetch(
    `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${p}`
  );
  return await response.json();
}

function imageTag(image, index) {
  return (
    <a
      className="image"
      key={index}
      href={image.links.html}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={image.urls.regular} alt={image.alt_description} />
    </a>
  );
}

const [page, setPage] = createSignal(1);
const [images, setImages] = createSignal([]);

function onMore(e) {
  e.preventDefault();
  e.stopPropagation();
  setPage((prev) => prev + 1);
}

function App() {
  createEffect(async () => {
    const json = await getPhotos(page());
    setImages((prev) => prev.concat(json));
  });

  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>

      <form>
        <input type="text" placeholder="Search Unsplash..." />
        <button>Search</button>
        <button onClick={onMore}>More ({images().length})</button>
      </form>

      <div className="image-grid">
        <For each={images()} fallback={<div>Loading...</div>}>
          {imageTag}
        </For>
      </div>
    </div>
  );
}

export default App;
