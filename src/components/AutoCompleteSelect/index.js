"use client";
import { useState } from "react";
import Input from "../input";

export default function AutoCompleteSelect({
  label,
  placeholder,
  type,
  id,
  size,
  items,
  onSelect,
}) {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState({ name: "" });
  const [filteredItems, setFilteredItems] = useState([]);

  const onClick = (item) => {
    console.log("click" + item);
    onSelect(item);
    setSelected(item);
    setFilteredItems([]);
    setValue("");
  };

  const reset = () => {
    setSelected({ name: "" });
    onSelect(null);
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
    <div className={"autoComplete" + " size"}>
      <Input
        label={label}
        placeholder={placeholder}
        type={type}
        size={size}
        onChange={onChange}
        value={value}
      />
      {selected.name !== "" && (
        <div className="tag">
          <span>{selected.name} </span>
          <i onClick={reset}>✖</i>
        </div>
      )}
      {filteredItems.length > 0 && (
        <div className="dropdown">
          {filteredItems.map((item) => (
            <a key={item.id} onClick={() => onClick(item)}>
              {item.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
