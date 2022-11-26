import categories from "../categories";

function optionTag(category, index) {
  return (
    <option key={index} value={category.id}>
      {category.name}
    </option>
  );
}

export default function CategorySelector() {
  return (
    <div className="category-selector">
      <p>Select Category</p>
      <select>
        <For each={categories}>{optionTag}</For>
      </select>
    </div>
  );
}
