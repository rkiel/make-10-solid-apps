import { createResource, createSignal, onMount } from "solid-js";

import "./App.css";

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

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

async function getPhotos(page) {
  const response = await fetch(
    `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${page}`
  );
  const data = await response.json();
  return data;
}

async function searchPhotos(page, query) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos/?client_id=${accessKey}&page=${page}&query=${query}`
  );
  const data = await response.json();
  return data.results;
}

function App() {
  const [page, setPage] = createSignal(1);
  const [query, setQuery] = createSignal("");
  const [images, setImages] = createSignal([]);

  async function loadPhotos(page, query = "") {
    let results;
    if (query === "") {
      results = await getPhotos(page);
    } else {
      results = await searchPhotos(page, query);
    }
    if (page === 1) {
      setImages(results);
    } else {
      setImages((prevImages) => prevImages.concat(results));
    }
  }

  function onMore(e) {
    setPage((prevPage) => prevPage + 1);
    loadPhotos(page(), query());
  }

  function onSearch(e) {
    e.preventDefault();
    e.stopPropagation();
    setPage(1);
    loadPhotos(page(), query());
  }

  function onClear() {
    setPage(1);
    setQuery("");
    loadPhotos(page(), query());
  }

  function onQuery(e) {
    setQuery(e.target.value);
  }

  onMount(() => {
    loadPhotos(page(), query());
  });

  return (
    <div className="app">
      <div style="display: flex; justify-content: center; ">
        <h1>Unsplash Image Gallery!</h1>
        <button onClick={onMore}>More ({images().length})</button>
        <button onClick={onClear}>Clear</button>
      </div>

      <form onSubmit={onSearch}>
        <input
          type="text"
          placeholder="Search Unsplash..."
          onInput={onQuery}
          value={query()}
        />
        <button>Search</button>
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
