import { useEffect, useState } from "react";

export default function SelectEmploymentTypes({
  employmentTypes,
  label,
  size,
  onChange,
}) {
  const [eTypes, setETypes] = useState([]);
  const onSelect = (e) => {
    const tps = [...eTypes];
    if (e.target.checked && !tps.includes(e.target.value * 1)) {
      tps.push(e.target.value * 1);
      setETypes(tps);
    } else if (!e.target.checked && tps.includes(e.target.value * 1)) {
      const index = tps.indexOf(e.target.value * 1);
      tps.splice(index, 1);
      setETypes(tps);
    }

    console.log(eTypes);
  };

  useEffect(() => {
    onChange(eTypes);
  }, [eTypes]);

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
              />
              <label htmlFor={type.id + "-type"}>{type.name}</label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
