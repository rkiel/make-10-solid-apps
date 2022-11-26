import categories from "../categories";

function optionTag(category, index) {
  return <option key={index} value={category.id} innerHTML={category.name} />;
}

export default function CategorySelector(props) {
  const category = props.category;
  const chooseCategory = props.chooseCategory;

  function selectCategory(e) {
    chooseCategory(e.target.value);
  }

  return (
    <div className="category-selector">
      <p>Select Category</p>
      <select onChange={selectCategory}>
        <For each={categories}>{optionTag}</For>
      </select>
    </div>
  );
}
