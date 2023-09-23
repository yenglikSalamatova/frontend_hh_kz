import { useEffect, useState } from "react";

export default function SelectEmploymentTypes({
  employmentTypes,
  label,
  size,
  onChange,
  selected,
}) {
  const onSelect = (e) => {
    const value = e.target.value * 1;
    const updatedSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    onChange(updatedSelected);
  };

  console.log(selected);

  return (
    <div>
      <fieldset className={"fieldset fieldset-start " + size}>
        <label>{label}</label>
        <div className="radio-group">
          {employmentTypes.map((type) => (
            <div className="radio" key={type.id}>
              <input
                type="checkbox"
                name="experience"
                id={type.id + "-type"}
                value={type.id}
                onChange={onSelect}
                checked={selected.includes(type.id * 1)}
              />
              <label htmlFor={type.id + "-type"}>{type.name}</label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
