import Link from "next/link";
export default function MyResume({ item }) {
  return (
    <div className="card mtb4">
      <Link className="a-h3" href={`/resumes/${item.id}`}>
        {item.position}
      </Link>
      <p>Создан {item.createdAt}</p>
      <h4 className="mtb2">Статистика за все время</h4>
      <div className="flex">
        <a className="p3">0 показов</a>
        <a className="p3">0 просмотров</a>
        <a className="p3">0 приглашений</a>
      </div>
    </div>
  );
}
