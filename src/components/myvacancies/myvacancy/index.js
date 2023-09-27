"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function MyVacancy({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="card mtb4">
      <Link className="a-h3" href={`/resumes/${item.id}`}>
        {item.position}
      </Link>
      <p>Создан {item.createdAt}</p>

      <button className="deleteResume">Удалить</button>
    </div>
  );
}
