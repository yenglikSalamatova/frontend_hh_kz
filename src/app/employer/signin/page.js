"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, signInCompany } from "@/app/store/slices/authSlice";
import { useRouter } from "next/navigation";

export default function EmployerSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, []);

  const handleSignIn = () => {
    dispatch(signInCompany({ email, password }, router));
  };

  return (
    <main className="bg signup">
      <div className="container">
        <Image src="/images/hh_logo.svg" width={50} height={50} alt="Logo" />
        <div className="card">
          <h1>Вход для поиска сотрудников</h1>
          <form>
            <input
              className="input"
              type="text"
              placeholder="Электронная почта"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error &&
              Object.keys(error).length > 0 &&
              Object.keys(error).map((key) => (
                <p className="error" key={key}>
                  {error[key]}
                </p>
              ))}
            <button
              type="button"
              className="button button-primary"
              onClick={handleSignIn}
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
