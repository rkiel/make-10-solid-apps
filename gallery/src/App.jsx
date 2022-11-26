import { createResource, createSignal, createEffect } from "solid-js";

import "./App.css";

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

async function getPhotos(page) {
  const response = await fetch(
    `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${page}`
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

function App() {
  const [page, setPage] = createSignal(1);
  const [data] = createResource(page, getPhotos);
  const [images, setImages] = createSignal([]);

  function onMore(e) {
    e.preventDefault();
    e.stopPropagation();
    setPage((prevPage) => prevPage + 1);
  }

  createEffect(async () => {
    const nextPage = data();
    if (nextPage) setImages((prevImages) => prevImages.concat(nextPage));
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
