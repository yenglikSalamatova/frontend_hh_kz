"use client";

import Image from "next/image";
import Header from "@/components/header/index";
import Input from "@/components/input";
import { END_POINT } from "@/config/end-point";
import axios from "axios";
import { useEffect, useState } from "react";
import AutoCompleteSelect from "@/components/AutoCompleteSelect";
import SelectDate from "@/components/SelectDate";

export default function CreateResumePage() {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);

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

  console.log("re render");

  const onSelect = (data) => {
    console.log(data);
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
              <label for="g1">Мужской</label>
            </div>
            <div className="radio">
              <input className="radio" type="radio" name="gender" id="g2" />
              <label for="g2">Женский</label>
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
              <label for="e1">Есть опыт работы</label>
            </div>
            <div className="radio">
              <input className="radio" type="radio" name="experience" id="e2" />
              <label for="e2">Нет опыта работы</label>
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
      </div>
    </main>
  );
}
