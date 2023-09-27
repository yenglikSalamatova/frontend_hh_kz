"use client";
import Image from "next/image";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyVacancies } from "@/app/store/slices/vacancySlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MyVacancies from "@/components/myvacancies";

export default function Vacancy() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyVacancies());
  }, []);

  return (
    <main>
      <Header />
      <div className="container">
        <div className="flex flex-ai-c flex-jc-sb ptb6">
          <h1>Мои вакансии</h1>
          <Link
            href="/create-resume"
            className="button button-secondary-bordered"
          >
            Создать вакансию
          </Link>
        </div>
        <MyVacancies />
      </div>
    </main>
  );
}
