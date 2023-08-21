"use client";
import Image from "next/image";
import searchIcon from "../../app/images/search.svg";
import logo from "../../app/images/hh_logo.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-inner">
          <div>
            <Image src={logo} alt="logo_hh" />
            <a>Работодателям</a>
            <a>Помощь</a>
          </div>
          <div>
            <button className="header-search">
              <Image src={searchIcon} alt="search-icon" />
              Поиск
            </button>
            <button className="header-button header-button--green">
              Создать резюме
            </button>
            <button className="header-button ">Войти</button>
          </div>
        </div>
      </div>
    </header>
  );
}
