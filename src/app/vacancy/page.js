"use client";
import Image from "next/image";
import Header from "@/components/header";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, signInCompany } from "@/app/store/slices/authSlice";
import { useRouter } from "next/navigation";

export default function Vacancy() {
  return (
    <main>
      <Header />
      Vacancy
    </main>
  );
}
