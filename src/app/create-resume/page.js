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

export default function CreateResumePage() {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [skills, setSkills] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [workingHistories, setWorkingHistories] = useState([]);

  useEffect(() => {
    axios.get(`${END_POINT}/api/region/cities`, {}).then((res) => {
      console.log("did mount");
      setCities(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${END_POINT}/api/region/countries`, {}).then((res) => {
      console.log("did mount");
      setCountries(res.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`${END_POINT}/api/skills`, {}).then((res) => {
      console.log("did mount");
      setSkills(res.data);
    });
  }, []);

  console.log("re render");

  const onSelect = (data) => {
    console.log(data);
  };

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

  return (
    <main>
      <Header />
      <div className="container ptb6">
        <h1 className="mtb4">Ваше резюме</h1>

        <h3 className="mtb4">Контактные данные</h3>
        <Input label="Имя" type="text" size="fieldset-md" />
        <Input label="Фамилия" type="text" size="fieldset-md" />
        <Input label="Мобильный телефон" type="text" size="fieldset-md" />
        <AutoCompleteSelect
          label="Город проживания"
          type="text"
          size="fieldset-md"
          items={cities}
          onSelect={onSelect}
        />

        <h3 className="mtb4">Основная информация</h3>
        <SelectDate size="fieldset-sm" label="Дата рождения" />
        <fieldset className={"fieldset fieldset-start fieldset-md"}>
          <label>Пол</label>
          <div className="radio-group">
            <div className="radio">
              <input type="radio" name="gender" id="g1" />
              <label htmlFor="g1">Мужской</label>
            </div>
            <div className="radio">
              <input className="radio" type="radio" name="gender" id="g2" />
              <label htmlFor="g2">Женский</label>
            </div>
          </div>
        </fieldset>

        <AutoCompleteSelect
          label="Гражданство"
          type="text"
          size="fieldset-md"
          items={countries}
          onSelect={onSelect}
        />

        <fieldset className={"fieldset fieldset-start"}>
          <label>Опыт работы</label>
          <div className="radio-group">
            <div className="radio">
              <input type="radio" name="experience" id="e1" />
              <label htmlFor="e1">Есть опыт работы</label>
            </div>
            <div className="radio">
              <input className="radio" type="radio" name="experience" id="e2" />
              <label htmlFor="e2">Нет опыта работы</label>
            </div>
          </div>
        </fieldset>

        <h3 className="mtb4">Специальность</h3>
        <Input label="Желаемая должность" type="text" size="fieldset-lg" />
        <fieldset className={"fieldset fieldset-md"}>
          <label>Зарплата</label>
          <div className="salary">
            <input type="text" className="input" />
            <select className="input">
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
          <textarea className="textarea" placeholder="Расскажите о себе" />
        </fieldset>

        <AutoCompleteTags
          label="Ключевые навыки"
          type="text"
          size="fieldset-lg"
          items={skills}
          onSelect={onSelect}
        />
      </div>
    </main>
  );
}
