import Image from "next/image";
import Header from "@/components/header/index";
import MyResumes from "@/components/myResumes";

export default function ResumePage() {
  const resumes = [
    {
      position: "Менеджер отдела продаж",
      createdAt: "25.06.2023",
      stats: {
        views: 1,
        applies: 0,
        shows: 2,
      },
    },
    {
      position: "Разработчик программного обеспечения",
      createdAt: "10.07.2023",
      stats: {
        views: 3,
        applies: 1,
        shows: 1,
      },
    },
    {
      position: "Финансовый аналитик",
      createdAt: "15.07.2023",
      stats: {
        views: 2,
        applies: 2,
        shows: 0,
      },
    },
    {
      position: "Дизайнер интерфейсов",
      createdAt: "05.08.2023",
      stats: {
        views: 4,
        applies: 1,
        shows: 3,
      },
    },
    // Добавьте другие объекты, если необходимо
  ];

  return (
    <main>
      <Header />
      <div className="container">
        <div className="flex flex-ai-c flex-jc-sb ptb6">
          <h1>Мои резюме</h1>
          <button className="button button-secondary-bordered">
            Создать резюме
          </button>
        </div>
        <MyResumes resumes={resumes} />
      </div>
    </main>
  );
}
