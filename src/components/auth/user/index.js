"use client";
import Image from "next/image";
import { useState } from "react";

export default function UserLogin() {
  const [step, setStep] = useState(1);

  return (
    <section className="login-page">
      {step === 1 && (
        <div className="card">
          <h1>Поиск работы</h1>
          <form>
            <input
              className="input"
              type="text"
              placeholder="Электронная почта или телефон"
            />
            <button
              className="button button-primary"
              onClick={() => setStep(2)}
            >
              Продолжить
            </button>
          </form>
        </div>
      )}

      {step === 1 && (
        <div className="card">
          <h1>Поиск сотрудников</h1>
          <form>
            <p>Размещение вакансий и доступ к базе резюме</p>
            <button className="button button-primary--bordered">
              Я ищу сотрудников
            </button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h1>Отправили код на ...</h1>
          <form>
            <p>
              Напишите его, чтобы подтвердить, что это вы, а не кто-то другой
              входит в личный кабинет
            </p>
            <input className="input" type="text" placeholder="Введите код" />
            <p className="text-light">Повторить можно через 00:30</p>
            <button
              className="button button-primary"
              onClick={() => setStep(3)}
            >
              Продолжить
            </button>
            <button
              className="button button-primary--bordered"
              onClick={() => setStep(1)}
            >
              Назад
            </button>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h1>Давайте познакомимся</h1>
          <form>
            <input className="input" type="text" placeholder="Имя" />
            <input className="input" type="text" placeholder="Фамилия" />
            <button className="button button-primary">Продолжить</button>
            <button
              className="button button-primary--bordered"
              onClick={() => setStep(2)}
            >
              Назад
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
