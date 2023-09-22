import { useState } from "react";

export default function ModalAddExp({ onToggle, addWorkingHistory }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [duties, setDuties] = useState("");

  const onChangeMonth = (e) => {
    setStartDate((prev) => {
      return new Date(prev.getFullYear(), parseInt(e.target.value));
    });
  };

  const onChangeYear = (e) => {
    setStartDate((prev) => {
      return new Date(parseInt(e.target.value), prev.getMonth());
    });
  };

  const onChangeMonthEnd = (e) => {
    setEndDate((prev) => {
      return new Date(prev.getFullYear(), parseInt(e.target.value));
    });
  };

  const onChangeYearEnd = (e) => {
    setEndDate((prev) => {
      return new Date(parseInt(e.target.value), prev.getMonth());
    });
  };

  const onChangeCompany = (e) => {
    setCompany(e.target.value);
  };

  const onChangePosition = (e) => {
    setPosition(e.target.value);
  };

  const onChangeDuties = (e) => {
    setDuties(e.target.value);
  };

  const save = () => {
    const workingHistory = {
      start_date: startDate,
      end_date: endDate,
      company_name: company,
      company_description: position,
      responsibilities: duties,
    };
    addWorkingHistory(workingHistory);
    onToggle();
  };

  console.log(startDate, endDate);

  return (
    <div className="modal">
      <div className="modal-backdrop" onClick={onToggle}></div>
      <div className="modal-inner">
        <h3 className="mtb4">Опыт работы</h3>
        <h4>Начало работы</h4>

        <div className="selectdate selectdate-noday">
          <select onChange={onChangeMonth} className="input select">
            <option value="" hidden>
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
          />
        </div>

        <h4>Конец работы</h4>

        <div className="selectdate selectdate-noday">
          <select onChange={onChangeMonthEnd} className="input select">
            <option value="" hidden>
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
            onChange={onChangeYearEnd}
          />
        </div>

        <h4>Организация</h4>
        <input
          className="input"
          type="text"
          placeholder="Название компании"
          onChange={onChangeCompany}
          value={company}
        />

        <h4>Должность</h4>
        <input
          className="input"
          type="text"
          placeholder="Должность"
          value={position}
          onChange={onChangePosition}
        />

        <h4>Обязанности на рабочем месте</h4>
        <textarea
          className="input textarea"
          placeholder="Опишите что вы делали на работе"
          value={duties}
          onChange={onChangeDuties}
        ></textarea>

        <div className="button-group button-group--right">
          <button
            className="button button-primary--bordered"
            onClick={onToggle}
          >
            Отмена
          </button>
          <button className="button button-primary" onClick={save}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
