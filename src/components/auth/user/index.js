"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  authorize,
  sendVerificationEmail,
  verifyCode,
} from "@/app/store/slices/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserLogin() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [time, setTime] = useState(120);
  const [code, setCode] = useState("");

  const router = useRouter();
  const isAuth = useSelector((state) => state.auth.isAuth);

  const dispatch = useDispatch();

  const sendVerifyEmail = () => {
    dispatch(sendVerificationEmail(email));
    setStep(2);
  };

  useEffect(() => {
    let interval;
    if (step === 2) {
      interval = setInterval(() => {
        if (time !== 0) setTime((prev) => prev - 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
  }, [step]);

  useEffect(() => {
    if (isAuth) {
      router.replace("/resumes");
    }
  }, [isAuth]);

  const min = parseInt(time / 60);
  const sec = time % 60;

  const verifyCodeFunc = () => {
    dispatch(verifyCode(email, code));
  };

  return (
    <section className="login-page">
      {isAuth ? "true" : "false"}
      {step === 1 && (
        <div className="card">
          <h1>Поиск работы</h1>
          <form>
            <input
              className="input"
              type="text"
              placeholder="Электронная почта или телефон"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="button button-primary" onClick={sendVerifyEmail}>
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
            <Link
              href="/employer/signin"
              className="button button-primary--bordered"
            >
              Я ищу сотрудников
            </Link>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h1>Отправили код на {email}</h1>
          <form>
            <p>
              Напишите его, чтобы подтвердить, что это вы, а не кто-то другой
              входит в личный кабинет
            </p>
            <input
              className="input"
              type="text"
              placeholder="Введите код"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <p className="text-light">
              Повторить можно через {min}:{sec}
            </p>
            <button
              type="button"
              className="button button-primary"
              onClick={verifyCodeFunc}
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
      {/*
      {step === 3 && (
        <div className="card">
          <h1>Давайте познакомимся</h1>
          <form>
            <input className="input" type="text" placeholder="Имя" />
            <input className="input" type="text" placeholder="Фамилия" />
            <button
              type="button"
              className="button button-primary"
              onClick={() => dispatch(authorize())}
            >
              Продолжить
            </button>
            <button
              className="button button-primary--bordered"
              onClick={() => setStep(2)}
            >
              Назад
            </button>
          </form>
        </div>
      )} */}
    </section>
  );
}
