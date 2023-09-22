"use client";
import Image from "next/image";
import Header from "@/components/header/index";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getResumeById } from "@/app/store/slices/resumesSlice";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ResumePage() {
  const resume = useSelector((state) => state.resume.resume);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getResumeById(id));
  }, []);

  console.log(resume);

  const birthday = new Date(resume.birthday);
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октяюря",
    "ноября",
    "декабря",
  ];
  const birthdayString = `${
    resume.gender?.toLowerCase() === "мужской" ? "родился" : "родилась"
  } ${birthday.getDate()} ${
    months[birthday.getMonth()]
  } ${birthday.getFullYear()}`;

  const age = Math.floor(
    (new Date().getTime() - birthday.getTime()) / (1000 * 60 * 60 * 24 * 365)
  );

  const calcPhone = (phone) => {
    console.log(phone);
    let newPhone;
    if (phone[0] == 8) {
      newPhone = "+7";
    } else {
      newPhone = phone[0];
    }
    newPhone = `${newPhone[0]} (${phone.slice(1, 4)}) ${phone.slice(
      4,
      7
    )}-${phone.slice(7, 9)}-${phone.slice(9, 11)}`;
    return newPhone;
  };

  const calcExperience = (history) => {
    let exp = "";
    let totalYears = 0;
    let totalMonths = 0;
    history.forEach((item) => {
      const start = new Date(item.start_date);
      const end = new Date(item.end_date);
      const diff = end.getTime() - start.getTime();
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor(
        (diff - years * (1000 * 60 * 60 * 24 * 365)) /
          (1000 * 60 * 60 * 24 * 30)
      );
      totalYears += years;
      totalMonths += months;
    });
    exp = `${totalYears} лет ${totalMonths} месяцев`;
    return exp;
  };

  return (
    <main>
      <Header />
      <div className="container">
        <div className="flex flex-ai-c flex-jc-sb ptb6">
          <Link href="/resumes" className="link">
            К списку резюме
          </Link>
          <Link
            href={`/edit-resume/${id}`}
            className="button button-secondary-bordered"
          >
            Редактировать
          </Link>
        </div>
        {Object.keys(resume).length == 0 && <p>Загрузка резюме...</p>}
        {Object.keys(resume).length > 0 && (
          <div className="resume">
            <div className="flex flex-col flex-jc-sb flex-g1 resume-header">
              {" "}
              <h1>
                {resume.first_name} {resume.last_name}
              </h1>
              <p>
                {resume.gender === "Мужской" ? "Мужчина" : "Женщина"} {age} лет,{" "}
                {birthdayString}
              </p>
              <p className="p-secondary">Контакты</p>
              <p>{calcPhone(resume.phone)}</p>
              <p>г. {resume.city?.name}</p>
            </div>
            <div className="flex flex-col flex-jc-sb flex-g2 mtb6">
              <div className="flex flex-row flex-jc-sb flex-ai-c">
                <h3>{resume.position}</h3>
                <h3>
                  {resume.salary.toLocaleString()} {resume.salary_type}
                </h3>
              </div>

              <p>
                Занятость:{" "}
                {resume.employmentTypes
                  .map((item) => item.name.toLowerCase())
                  .join(", ")}
              </p>
            </div>
            <div className="flex flex-col flex-jc-sb flex-g2">
              <h3 className="h3-secondary">
                Опыт работы {calcExperience(resume.workingHistories)}
              </h3>

              {resume.workingHistories.map((item) => (
                <div className="flex flex-row flex-g6" key={item.id}>
                  <div className="flex flex-col flex-ai-c flex-g1">
                    <p>
                      {new Date(item.start_date).toLocaleDateString("kz-KZ", {
                        year: "numeric",
                        month: "long",
                      })}{" "}
                      —
                    </p>

                    <p>
                      {" "}
                      {new Date(item.end_date).toLocaleDateString("kz-KZ", {
                        year: "numeric",
                        month: "long",
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col flex-g1">
                    {" "}
                    <p className="p-bold">{item.company_name}</p>
                    <p className="p-bold">{item.company_description}</p>
                    <p>{item.responsibilities}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col flex-jc-sb flex-g2 mtb6">
              <h3 className="h3-secondary">Ключевые навыки</h3>
              <div className="flex flex-row flex-wrap flex-g2">
                {resume.skills.split(",").map((item) => {
                  return (
                    <div className="skill" key={item}>
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col flex-jc-sb flex-g2 mtb6">
              <h3 className="h3-secondary">Обо мне</h3>
              <p>{resume.about}</p>
            </div>
            <div className="flex flex-col flex-jc-sb flex-g2 mtb6">
              {resume.education.map((item) => (
                <>
                  <h3 className="h3-secondary">{item.level} образование</h3>
                  <div className="flex flex-row flex-g6">
                    <div>{new Date(item.end_date).getFullYear()}</div>
                    <div className="flex flex-col flex-g1">
                      <p className="p-bold">{item.university_name}</p>
                      <p className="p-bold">{item.faculty}</p>
                      <p>{item.major}</p>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className="flex flex-col flex-jc-sb flex-g2 mtb6">
              <h3 className="h3-secondary">Знание языков</h3>
              <div className="flex flex-row flex-g2">
                {resume.foreignLanguages.map((item) => {
                  return (
                    <div className="skill" key={item.id}>
                      {item.name} - {item.level}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col flex-jc-sb flex-g2 mtb6">
              <h3 className="h3-secondary">Гражданство</h3>
              <p>Гражданство: {resume.citizenshipObj.name}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
