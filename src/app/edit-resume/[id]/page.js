"use client";

import Image from "next/image";
import Header from "@/components/header/index";
import Input from "@/components/input";
import { END_POINT } from "@/config/end-point";
import axios from "axios";
import { useEffect, useState } from "react";
import AutoCompleteSelect from "@/components/AutoCompleteSelect";
import SelectDate from "@/components/SelectDate";
import ModalAddExp from "@/components/ModalAddExp";
import WorkingHistory from "@/components/WorkingHistory";
import AutoCompleteTags from "@/components/AutoCompleteTags";
import AddEducation from "@/components/AddEducation";
import AddLanguage from "@/components/AddLanguage";
import SelectEmploymentTypes from "@/components/SelectEmploymentTypes";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createResume } from "@/app/store/slices/resumesSlice";
import { useParams } from "next/navigation";
import { getResumeById } from "@/app/store/slices/resumesSlice";

export default function EditResumePage() {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [skills, setSkills] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [workingHistories, setWorkingHistories] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [first_name, setName] = useState("");
  const [last_name, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [cityId, setCity] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [salary_type, setSalaryType] = useState("tenge");
  const [skillsNames, setSkillsNames] = useState("");
  const [education, setEducation] = useState([]);
  const [foreignLanguages, setForeignLanguages] = useState([
    { name: "Английский", level: "A1" },
  ]);
  const [employmentTypesIds, setEmploymentTypesIds] = useState([]);
  const [about, setAbout] = useState("");

  const { id } = useParams();
  const resume = useSelector((state) => state.resume.resume);

  useEffect(() => {
    dispatch(getResumeById(id));
  }, []);
  console.log(resume);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`${END_POINT}/api/region/cities`, {}).then((res) => {
      setCities(res.data);
    });
    axios.get(`${END_POINT}/api/region/countries`, {}).then((res) => {
      setCountries(res.data);
    });
    axios.get(`${END_POINT}/api/skills`, {}).then((res) => {
      setSkills(res.data);
    });
    axios.get(`${END_POINT}/api/employment-types`, {}).then((res) => {
      setEmploymentTypes(res.data);
    });
    axios.get(`${END_POINT}/api/employment-types`, {}).then((res) => {
      setEmploymentTypes(res.data);
    });
  }, []);

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const addWorkingHistory = (workingHistory) => {
    setWorkingHistories((prev) => {
      return [...prev, workingHistory];
    });
  };

  const removeWorkingHistory = (workingHistory) => {
    setWorkingHistories((prev) => {
      return prev.filter((item) => item !== workingHistory);
    });
  };

  const onSkillsChange = (skills) => {
    let skillsName;
    skillsName = skills.map((item) => item.name).join(",");
    console.log(skillsName);
    setSkillsNames(skillsName);
  };

  const handleSave = () => {
    dispatch(
      createResume(
        {
          first_name,
          last_name,
          gender,
          phone,
          cityId,
          birthday,
          citizenship,
          position,
          salary,
          salary_type,
          workingHistories,
          skills: skillsNames,
          education,
          foreignLanguages,
          employmentTypes: employmentTypesIds,
          about,
          main_language: "",
        },
        router
      )
    );
  };

  console.log("onSave", {
    first_name,
    last_name,
    gender,
    phone,
    cityId,
    birthday,
    citizenship,
    position,
    salary,
    salary_type,
    workingHistories,
    skills: skillsNames,
    education,
    foreignLanguages,
    employmentTypes: employmentTypesIds,
    about,
    main_language: "",
  });

  useEffect(() => {
    if (resume.id) {
      console.log(resume);
      setName(resume.first_name);
      setSurname(resume.last_name);
      setPhone(resume.phone);
      setCity(resume.cityId);
      setBirthday(resume.birthday);
      setGender(resume.gender);
      setCitizenship(resume.citizenship);
      setPosition(resume.position);
      setSalary(resume.salary);
      setSalaryType(resume.salary_type);
      setWorkingHistories(resume.workingHistories);
      setAbout(resume.about);
      setSkillsNames(resume.skills);
      setEducation(resume.education);
      setForeignLanguages(resume.foreignLanguages);
      setEmploymentTypesIds(resume.employmentTypes.map((item) => item.id));
    }
  }, [resume]);

  return (
    <main>
      <Header />
      <div className="container ptb6">
        <h1 className="mtb4">Ваше резюме</h1>

        <h3 className="mtb4">Контактные данные</h3>
        <Input
          label="Имя"
          type="text"
          size="fieldset-md"
          onChange={(e) => setName(e.target.value)}
          value={first_name}
        />
        <Input
          label="Фамилия"
          type="text"
          size="fieldset-md"
          onChange={(e) => setSurname(e.target.value)}
          value={last_name}
        />
        <Input
          label="Мобильный телефон"
          type="text"
          size="fieldset-md"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
        <AutoCompleteSelect
          label="Город проживания"
          type="text"
          size="fieldset-md"
          items={cities}
          onSelect={(data) => setCity(data.id)}
          selectedItem={cityId}
        />

        <h3 className="mtb4">Основная информация</h3>
        <SelectDate
          size="fieldset-sm"
          label="Дата рождения"
          onChange={(date) => setBirthday(date)}
          selected={birthday}
        />
        <fieldset className={"fieldset fieldset-start fieldset-md"}>
          <label>Пол</label>
          <div className="radio-group">
            <div className="radio">
              <input
                type="radio"
                name="gender"
                id="g1"
                value={"Мужской"}
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "Мужской"}
              />
              <label htmlFor="g1">Мужской</label>
            </div>
            <div className="radio">
              <input
                className="radio"
                type="radio"
                name="gender"
                id="g2"
                value={"Женский"}
                onChange={(e) => setGender(e.target.value)}
                checked={gender === "Женский"}
              />
              <label htmlFor="g2">Женский</label>
            </div>
          </div>
        </fieldset>

        <AutoCompleteSelect
          label="Гражданство"
          type="text"
          size="fieldset-md"
          items={countries}
          onSelect={(data) => setCitizenship(data.id)}
          selectedItem={citizenship}
        />

        <h3 className="mtb4">Специальность</h3>
        <Input
          label="Желаемая должность"
          type="text"
          size="fieldset-lg"
          onChange={(e) => setPosition(e.target.value)}
          value={position}
        />
        <fieldset className={"fieldset fieldset-md"}>
          <label>Зарплата</label>
          <div className="salary">
            <input
              type="text"
              className="input"
              value={salary}
              onChange={(e) => setSalary(+e.target.value)}
            />
            <select
              className="input"
              value={salary_type}
              onChange={(e) => setSalaryType(e.target.value)}
            >
              <option value="tenge">₸</option>
              <option value="rub">₽</option>
              <option value="dollar">$</option>
            </select>
            <p>на руки</p>
          </div>
        </fieldset>

        <h3 className="mtb4">Опыт работы</h3>

        {modalOpen && (
          <ModalAddExp
            onToggle={handleModal}
            addWorkingHistory={addWorkingHistory}
          />
        )}

        <fieldset className={"fieldset fieldset-md fieldset-start"}>
          <label>Места работы</label>
          <div className="experience">
            {workingHistories.map((item) => (
              <WorkingHistory
                item={item}
                key={item.company_name}
                remove={removeWorkingHistory}
              />
            ))}

            <button
              className="button button-primary--bordered"
              onClick={handleModal}
            >
              Добавить место работы
            </button>
          </div>
        </fieldset>

        <fieldset className={"fieldset fieldset-lg fieldset-start"}>
          <label>О себе</label>
          <textarea
            className="textarea"
            placeholder="Расскажите о себе"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </fieldset>

        <AutoCompleteTags
          label="Ключевые навыки"
          type="text"
          size="fieldset-lg"
          items={skills}
          onSelect={onSkillsChange}
          selectedItems={skillsNames}
        />

        <h3 className="mtb4">Образование</h3>
        <AddEducation
          onChange={(education) => {
            setEducation(education);
          }}
          education={education}
        />

        <h3 className="mtb4">Владение языками</h3>
        <AddLanguage
          onChange={(langs) => {
            setForeignLanguages(langs);
          }}
          foreignLanguages={foreignLanguages}
        />

        <h3 className="mtb4">Другая важная информация</h3>
        <SelectEmploymentTypes
          employmentTypes={employmentTypes}
          selected={employmentTypesIds}
          label={"График работы"}
          size={"fieldset-md"}
          onChange={(types) => {
            setEmploymentTypesIds(types);
          }}
        />

        <button className="button button-primary" onClick={handleSave}>
          Отредактировать
        </button>
      </div>
    </main>
  );
}
