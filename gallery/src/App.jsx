import { createResource } from "solid-js";

import "./App.css";

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

async function fetchData() {
  const response = await fetch(
    `https://api.unsplash.com/photos/?client_id=${accessKey}`
  );
  return await response.json();
}

function App() {
  const [images] = createResource(fetchData);

  return (
    <div className="app">
      <h1>Unsplash Image Gallery!</h1>

      <form>
        <input type="text" placeholder="Search Unsplash..." />
        <button>Search</button>
      </form>

      <div className="image-grid">
        <For each={images()} fallback={<div>Loading...</div>}>
          {(image, index) => (
            <div className="image" key={index}>
              <img src={image.urls.regular} alt={image.alt_description} />
            </div>
          )}
        </For>
      </div>
    </div>
  );
}

export default App;
