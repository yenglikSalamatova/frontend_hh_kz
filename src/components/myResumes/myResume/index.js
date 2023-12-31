"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { deleteResume } from "@/app/store/slices/resumesSlice";

export default function MyResume({ item }) {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(deleteResume(id));
  };
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
      <button className="deleteResume" onClick={() => handleDelete(item.id)}>
        Удалить
      </button>
    </div>
  );
}
