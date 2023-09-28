import { useState, useEffect } from "react";
import Input from "../input";

export default function AutoCompleteTags({
  label,
  placeholder,
  type,
  id,
  size,
  items,
  onSelect,
  selectedItems,
}) {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (selectedItems) {
      setSelected(items.filter((item) => selectedItems.includes(item.name)));
    }
  }, [selectedItems, items]);

  useEffect(() => {
    setFilteredItems((prev) => prev.filter((item) => !selected.includes(item)));
    onSelect(selected);
  }, [selected]);

  const onClick = (item) => {
    setSelected((prev) => [...prev, item]);
  };

  const reset = (id) => {
    // filter out the item that is clicked
    setSelected((prev) => prev.filter((item) => item.id !== id));
    setFilteredItems((prev) => [...prev, items.find((item) => item.id === id)]);
    // onSelect(null);
  };

  const onChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      setFilteredItems([]);
    } else {
      setFilteredItems([
        ...items.filter((item) => item.name.includes(e.target.value)),
      ]);
    }
  };

  return (
    <div className="">
      <div className="tags">
        {selected.length > 0 &&
          selected.map((item) => (
            <div className="tag" key={item.name}>
              <span>{item.name} </span>
              <i onClick={() => reset(item.id)}>✖ </i>
            </div>
          ))}
      </div>
      <div className={"autoComplete " + size}>
        <Input
          label={label}
          placeholder={placeholder}
          type={type}
          size={size}
          onChange={onChange}
          value={value}
        />

        {filteredItems.length > 0 && (
          <div className="dropdown dropdown-tags">
            <h4>Рекомендуемые навыки</h4>
            {filteredItems.map((item) => (
              <a key={item.id} onClick={() => onClick(item)}>
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
