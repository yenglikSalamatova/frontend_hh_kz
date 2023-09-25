"use client";
import Image from "next/image";
import searchIcon from "../../../public/images/search.svg";
import logo from "../../../public/images/hh_logo.svg";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/app/store/slices/authSlice";

export default function Header() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  console.log(currentUser);

  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <div>
            <Link href="/">
              <Image src={logo} alt="logo_hh" />
            </Link>
            {currentUser &&
              currentUser.role &&
              currentUser.role.name == "manager" && (
                <Link href="/vacancy">Мои вакансии</Link>
              )}

            {currentUser &&
              currentUser.role &&
              currentUser.role.name !== "manager" && (
                <Link href="/resumes">Мои резюме</Link>
              )}

            <a>Помощь</a>
          </div>
          <div>
            <button className="header-search">
              <Image src={searchIcon} alt="search-icon" />
              Поиск
            </button>
            {currentUser &&
              currentUser.role &&
              currentUser.role.name == "manager" && (
                <Link
                  href="/create-vacancy"
                  className="header-button header-button--green"
                >
                  Создать вакансию
                </Link>
              )}

            {currentUser &&
              currentUser.role &&
              currentUser.role.name !== "manager" && (
                <Link
                  href="/create-resume"
                  className="header-button header-button--green"
                >
                  Создать резюме
                </Link>
              )}

            {!isAuth ? (
              <Link href="/login" className="header-button ">
                Войти
              </Link>
            ) : (
              <Link
                href="/"
                className="header-button"
                onClick={() => dispatch(logout())}
              >
                Выйти
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
