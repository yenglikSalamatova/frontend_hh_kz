"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, signUpCompany } from "@/app/store/slices/authSlice";
import { useRouter } from "next/navigation";

export default function EmployerSignUp() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [company_description, setCompanyDescription] = useState("");
  const [company_address, setCompanyAddress] = useState("");
  const [company_logo, setCompanyLogo] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, []);

  const handleSignUp = () => {
    const data = {
      email,
      full_name: `${first_name} ${last_name}`,
      company_name,
      company_description,
      company_address,
      company_logo,
      password,
      password2: re_password,
    };
    console.log(data);
    dispatch(signUpCompany(data, router));
  };

  return (
    <main className="bg signup">
      <div className="container">
        <Image src="/images/hh_logo.svg" width={50} height={50} alt="Logo" />
        {step === 1 && (
          <div className="card">
            <h1>Регистрация для поиска сотрудников</h1>
            <p className="p-secondary">В завершении на почту придёт пароль</p>
            <form>
              <input
                className="input"
                type="text"
                placeholder="Электронная почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="button"
                className="button button-primary"
                onClick={nextStep}
              >
                Продолжить
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="card">
            <button className="btn-link" onClick={prevStep}>
              Назад
            </button>
            <h1>Как вас зовут?</h1>
            <form>
              <input
                className="input"
                type="text"
                placeholder="Имя"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className="input"
                type="text"
                placeholder="Фамилия"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
              <button
                type="button"
                className="button button-primary"
                onClick={nextStep}
              >
                Продолжить
              </button>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="card">
            <button className="btn-link" onClick={prevStep}>
              Назад
            </button>
            <h1>Введите информацию о компании</h1>
            <form>
              <input
                className="input"
                type="text"
                placeholder="Название компании"
                value={company_name}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <textarea
                className="textarea"
                type="text"
                placeholder="Описание компании"
                value={company_description}
                onChange={(e) => setCompanyDescription(e.target.value)}
              >
                {" "}
              </textarea>
              <input
                className="input"
                type="text"
                placeholder="Адрес компании"
                value={company_address}
                onChange={(e) => setCompanyAddress(e.target.value)}
              />
              <input
                type="file"
                className="input"
                accept="image/png, image/jpeg"
                onChange={(e) => setCompanyLogo(e.target.files[0])}
              />
              <button
                type="button"
                className="button button-primary"
                onClick={nextStep}
              >
                Продолжить
              </button>
            </form>
          </div>
        )}

        {step === 4 && (
          <div className="card">
            <button className="btn-link" onClick={prevStep}>
              Назад
            </button>
            <h1>Введите пароль</h1>
            <form>
              <input
                className="input"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="input"
                type="password"
                placeholder="Повторите пароль"
                value={re_password}
                onChange={(e) => setRePassword(e.target.value)}
              />
              <button
                type="button"
                className="button button-primary"
                onClick={handleSignUp}
              >
                Зарегистрироваться
              </button>
              {error &&
                Object.keys(error).map((key) => (
                  <p key={key} className="error">
                    {error[key]}
                  </p>
                ))}
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
