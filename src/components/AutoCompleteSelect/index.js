"use client";
import { useEffect, useState } from "react";
import Input from "../input";

export default function AutoCompleteSelect({
  label,
  placeholder,
  type,
  id,
  size,
  items,
  onSelect,
  selectedItem,
}) {
  const [value, setValue] = useState("");
  const [selected, setSelected] = useState({ name: "" });
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (selectedItem > 0) {
      items.map((item) => {
        if (item.id === selectedItem) setSelected(item);
      });
    }
  }, [selectedItem, items]);

  const onClick = (item) => {
    console.log("click" + item);
    setSelected(item);
    setFilteredItems([]);
    setValue("");
  };

  const reset = () => {
    setSelected({ name: "" });
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

  useEffect(() => {
    onSelect(selected);
  }, [selected]);

  return (
    <div className={"autoComplete " + size}>
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
