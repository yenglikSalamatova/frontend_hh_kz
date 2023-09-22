"use client";
import Image from "next/image";
import Header from "@/components/header/index";
import MyResumes from "@/components/myResumes";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyResumes } from "@/app/store/slices/resumesSlice";
import Link from "next/link";

export default function ResumePage() {
  const dispatch = useDispatch();
  const resumes = useSelector((state) => state.resume.resumes);

  const didMount = () => {
    dispatch(getMyResumes());
  };

  useEffect(didMount, []);
  return (
    <main>
      <Header />
      <div className="container">
        <div className="flex flex-ai-c flex-jc-sb ptb6">
          <h1>Мои резюме</h1>
          <Link
            href="/create-resume"
            className="button button-secondary-bordered"
          >
            Создать резюме
          </Link>
        </div>
        <MyResumes resumes={resumes} />
      </div>
    </main>
  );
}
