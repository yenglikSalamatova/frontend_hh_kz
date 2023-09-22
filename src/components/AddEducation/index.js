import React, { useState, useEffect } from "react";

export default function AddEducation({ onChange }) {
  const [education, setEducation] = useState([]);

  const onChangeData = (e) => {
    console.log(e.target.name, e.target.value);
    const [index, name] = e.target.name.split("-");
    console.log(index, name);

    let ed = [...education];
    ed[index][name] = e.target.value;
    setEducation(ed);
  };

  const newEducation = () => {
    setEducation((prev) => [
      ...prev,
      {
        level: "Среднее",
        university_name: "",
        faculty: "",
        major: "",
        end_date: "",
      },
    ]);
  };

  const removeEd = (ed) => {
    const eds = [...education];
    const index = eds.indexOf(ed);
    eds.splice(index, 1);
    setEducation(eds);
  };

  useEffect(() => {
    onChange(education);
  }, [education]);

  const educations = education.map((education, index) => {
    return (
      <div className="education" key={index}>
        <span onClick={() => removeEd(education)}>✖</span>
        <fieldset className={"fieldset fieldset-md"}>
          <label>Уровень</label>
          <select
            name={index + "-level"}
            onChange={onChangeData}
            value={education.level}
            className="input"
          >
            <option value="Среднее">Среднее</option>
            <option value="Среднее специальное">Среднее специальное</option>
            <option value="Неполное высшее">Неполное высшее</option>
            <option value="Высшее">Высшее</option>
          </select>
        </fieldset>
        <fieldset className={"fieldset fieldset-md"}>
          <label>Учебное заведение</label>
          <input
            type="text"
            className="input"
            onChange={onChangeData}
            value={education.university_name}
            name={index + "-university_name"}
          />
        </fieldset>

        <fieldset className={"fieldset fieldset-md"}>
          <label>Факультет</label>
          <input
            type="text"
            className="input"
            onChange={onChangeData}
            value={education.major}
            name={index + "-major"}
          />
        </fieldset>

        <fieldset className={"fieldset fieldset-md"}>
          <label>Специализация</label>
          <input
            type="text"
            className="input"
            onChange={onChangeData}
            value={education.faculty}
            name={index + "-faculty"}
          />
        </fieldset>

        <fieldset className={"fieldset fieldset-md"}>
          <label>Дата окончания</label>
          <input
            type="text"
            className="input"
            onChange={onChangeData}
            value={education.end_date}
            name={index + "-end_date"}
          />
        </fieldset>
      </div>
    );
  });

  return (
    <div className="eds">
      {educations}
      <a onClick={newEducation}>
        {education.length > 0
          ? "Указать еще одно место обучения"
          : "Указать место обучения"}
      </a>
    </div>
  );
}
