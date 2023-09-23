import React, { useEffect, useState } from "react";

export default function AddLanguage({ onChange, foreignLanguages }) {
  const remove = (index) => {
    onChange((prev) => {
      return prev.filter((item, i) => i !== index);
    });
  };

  const onSelect = (e) => {
    // console.log(e.target.name, e.target.value);
    const [key, index] = e.target.name.split("-");
    let langs = [...foreignLanguages];
    langs[index][key] = e.target.value;
    onChange(langs);
  };

  const lns = foreignLanguages.map((item, index) => {
    return (
      <div key={index} className="language">
        <span onClick={() => remove(index)}>✖</span>
        <fieldset className={"fieldset fieldset-md"}>
          <label>Язык</label>
          <select
            name={"name-" + index}
            className="input"
            value={foreignLanguages[index].name}
            onChange={onSelect}
          >
            <option value="Английский">Английский</option>
            <option value="Русский">Русский</option>
            <option value="Казахский">Казахский</option>
          </select>
        </fieldset>
        <fieldset className={"fieldset fieldset-md"}>
          <label>Уровень</label>
          <select
            name={"level-" + index}
            className="input"
            value={foreignLanguages[index].level}
            onChange={onSelect}
          >
            <option value="A1">A1 - начальный</option>
            <option value="A2">A2 - базовый</option>
            <option value="B1">B1 - средний</option>
            <option value="B2">B2 - выше среднего</option>
            <option value="C1">C1 - продвинутый</option>
            <option value="C2">C2 - в совершенстве</option>
          </select>
        </fieldset>
      </div>
    );
  });

  return (
    <div className="eds">
      {lns}
      <a
        onClick={() =>
          setForeignLanguages([...foreignLanguages, { name: "", level: "" }])
        }
      >
        Добавить язык
      </a>
    </div>
  );
}
