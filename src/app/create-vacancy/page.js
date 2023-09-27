"use client";

import ModalSelectSpec from "@/components/ModalSelectSpec";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSpecializations } from "@/app/store/slices/vacancySlice";

export default function CreateVacancy() {
  const [name, setName] = useState("");
  const [specializationId, setSpecializationId] = useState("");
  const [isOpenModalSpec, setIsOpenModalSpec] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpecializations());
  }, []);

  const toggleModalSpec = () => {
    setIsOpenModalSpec(!isOpenModalSpec);
  };

  const handleSpecChange = (e) => {
    console.log(e.target.value);
    setSpecializationId(e.target.value * 1);
  };

  return (
    <main>
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
          <button className="btn-link" onClick={toggleModalSpec}>
            Указать специализацию
          </button>
        </fieldset>

        {isOpenModalSpec && (
          <ModalSelectSpec
            onToggle={toggleModalSpec}
            onChange={handleSpecChange}
            specializationId={specializationId}
          />
        )}
      </div>
    </main>
  );
}
