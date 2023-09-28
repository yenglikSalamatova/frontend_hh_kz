"use client";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { deleteVacancy } from "@/app/store/slices/vacancySlice";

export default function MyVacancy({ item }) {
  const dispatch = useDispatch();
  console.log(item);

  const handleDelete = (id) => {
    dispatch(deleteVacancy(id));
  };

  return (
    <div className="card mtb4">
      <Link className="a-h3" href={`/resumes/${item.id}`}>
        {item.name}
      </Link>
      <p>Создан {item.createdAt}</p>

      <button className="deleteResume" onClick={() => handleDelete(item.id)}>
        Удалить
      </button>
    </div>
  );
}
