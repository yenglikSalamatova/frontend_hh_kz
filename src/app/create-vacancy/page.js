"use client";

import ModalSelectSpec from "@/components/ModalSelectSpec";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSpecializations,
  getCities,
  getExps,
  getSkills,
  getEmploymentTypes,
  createVacancy,
} from "@/app/store/slices/vacancySlice";
import AutoCompleteSelect from "@/components/AutoCompleteSelect";
import AutoCompleteTags from "@/components/AutoCompleteTags";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useRouter } from "next/navigation";

export default function CreateVacancy() {
  const [name, setName] = useState("");
  const [specializationId, setSpecializationId] = useState("");
  const [specName, setSpecName] = useState("");
  const [isOpenModalSpec, setIsOpenModalSpec] = useState(false);
  const [city, setCity] = useState("");
  const [salary_from, setSalaryFrom] = useState("");
  const [salary_to, setSalaryTo] = useState("");
  const [salary_type, setSalaryType] = useState("KZT");
  const [address, setAddress] = useState("");
  const [experienceId, setExperienceId] = useState("");
  const [description, setDescription] = useState(
    "<h2>Обязанности</h2><ul><li></li><li></li></ul> <h2>Требования</h2><ul><li></li><li></li></ul> <h2>Условия</h2><ul><li></li><li></li></ul>"
  );
  const [skillsNames, setSkillsNames] = useState("");
  const [employmentTypes, setEmploymentTypes] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getSpecializations());
    dispatch(getCities());
    dispatch(getExps());
    dispatch(getSkills());
    dispatch(getEmploymentTypes());
  }, []);

  const cities = useSelector((state) => state.vacancy.cities);
  const exps = useSelector((state) => state.vacancy.experiences);
  const allSkills = useSelector((state) => state.vacancy.skills);
  const allEmploymentTypes = useSelector(
    (state) => state.vacancy.employmentTypes
  );

  const toggleModalSpec = () => {
    setIsOpenModalSpec(!isOpenModalSpec);
  };

  const handleSpecChange = (e) => {
    console.log(e.target.value);
    setSpecName(e.target.dataset.name);
    setSpecializationId(e.target.value * 1);
  };

  const handleChangeExp = (e) => {
    setExperienceId(e.target.value);
  };

  const onSkillsChange = (skills) => {
    let skillsName;
    skillsName = skills.map((item) => item.name).join(",");
    console.log(skillsName);
    setSkillsNames(skillsName);
  };

  const handleCreate = () => {
    dispatch(
      createVacancy(
        {
          name,
          specializationId: `${specializationId}`,
          cityId: `${city}`,
          salary_from,
          salary_to,
          salary_type,
          address,
          experienceId,
          description,
          skills: skillsNames,
          employmentTypeId: employmentTypes,
          about_company: "",
        },
        router
      )
    );
  };

  console.log(employmentTypes);

  return (
    <main className="create-vacancy">
      <Header />
      <div className="container ptb6">
        <h1 className="mtb4">Ваша вакансия</h1>
        <h3 className="mtb4">Основная информация</h3>
        <fieldset className="fieldset-vertical">
          <label>Название вакансии</label>
          <input
            className="input"
            type="text"
            placeholder="Название"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset-vertical">
          <label>Специализация</label>
          {specName ? (
            <button className="btn-link" onClick={toggleModalSpec}>
              {specName}
            </button>
          ) : (
            <button className="btn-link" onClick={toggleModalSpec}>
              Указать специализацию
            </button>
          )}
        </fieldset>

        {isOpenModalSpec && (
          <ModalSelectSpec
            onToggle={toggleModalSpec}
            onChange={handleSpecChange}
            specializationId={specializationId}
          />
        )}

        <AutoCompleteSelect
          size="fieldset-vertical"
          items={cities}
          placeholder="Город"
          onSelect={(data) => setCity(data.id)}
          label="Город"
        />

        <fieldset className="fieldset-vertical">
          <label>Предпологаемый уровень дохода</label>
          <div className="input-group">
            <input
              className="input"
              type="text"
              placeholder="От"
              value={salary_from}
              onChange={(e) => setSalaryFrom(e.target.value)}
            />
            <input
              className="input"
              type="text"
              placeholder="До"
              value={salary_to}
              onChange={(e) => setSalaryTo(e.target.value)}
            />
            <select
              className="input"
              name="salary_type"
              value={salary_type}
              onChange={(e) => setSalaryType(e.target.value)}
            >
              <option value="KZT">KZT</option>
              <option value="USD">USD</option>
              <option value="RUB">RUB</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="fieldset-vertical">
          <label>Адрес</label>
          <input
            className="input"
            type="text"
            placeholder="Введите адрес"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </fieldset>

        <fieldset className="fieldset-vertical">
          <label>Опыт работы</label>
          <div className="radio-group">
            {exps.map((exp) => (
              <div className="radio" key={exp.id}>
                <input
                  className="input"
                  type="radio"
                  value={exp.id}
                  onChange={handleChangeExp}
                  name="experience"
                />
                <label>{exp.duration}</label>
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset className="fieldset-vertical">
          <label>Расскажите про вакансию</label>
          <div className="editor">
            <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: [
                  "undo",
                  "redo",
                  "|",
                  "bold",
                  "italic",
                  "bulletedList",
                  "numberedList",
                ],
              }}
              data={description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
            />
          </div>
        </fieldset>
        <AutoCompleteTags
          label="Ключевые навыки"
          type="text"
          size="fieldset-vertical"
          items={allSkills}
          onSelect={onSkillsChange}
        />

        <fieldset className="fieldset-vertical">
          {allEmploymentTypes.map((item) => (
            <div className="radio" key={item.id}>
              {" "}
              <input
                type="checkbox"
                name="employmentTypes"
                value={item.id}
                onChange={(e) => setEmploymentTypes(e.target.value)}
              />
              <label>{item.name}</label>
            </div>
          ))}
        </fieldset>

        <button className=" button button-primary" onClick={handleCreate}>
          Создать
        </button>
      </div>
    </main>
  );
}
