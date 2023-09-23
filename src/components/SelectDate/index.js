"use client";
import { useState, useEffect } from "react";

export default function SelectDate({ label, size, onChange, selected }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const onChangeDay = (e) => {
    setDay(e.target.value);
  };

  const onChangeMonth = (e) => {
    setMonth(e.target.value);
  };

  const onChangeYear = (e) => {
    setYear(e.target.value);
  };

  useEffect(() => {
    if (selected) {
      const date = new Date(selected);
      setDay(date.getDate());
      setMonth(date.getMonth());
      setYear(date.getFullYear());
    }
  }, [selected]);

  useEffect(() => {
    if (!day || !month || !year) return;
    const date = new Date();
    date.setFullYear(year);
    date.setMonth(month);
    date.setDate(day);
    onChange(date);
    console.log(date);
  }, [day, month, year]);

  return (
    <fieldset className={"fieldset " + size}>
      <label>{label}</label>
      <div className="selectdate">
        <input
          className="input"
          type="number"
          onChange={onChangeDay}
          placeholder="День"
          value={day}
        />
        <select onChange={onChangeMonth} className="input select" value={month}>
          <option value="" disabled hidden>
            Месяц
          </option>
          <option value="0">января</option>
          <option value="1">февраля</option>
          <option value="2">марта</option>
          <option value="3">апреля</option>
          <option value="4">мая</option>
          <option value="5">июня</option>
          <option value="6">июля</option>
          <option value="7">августа</option>
          <option value="8">сентября</option>
          <option value="9">октября</option>
          <option value="10">ноября</option>
          <option value="11">декабря</option>
        </select>
        <input
          placeholder="Год"
          className="input"
          type="number"
          onChange={onChangeYear}
          value={year}
        />
      </div>
    </fieldset>
  );
}
