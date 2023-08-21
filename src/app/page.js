import Image from "next/image";
import styles from "./page.module.css";
import Test from "../components/test";
import Header from "../components/header";
import UserLogin from "../components/auth/user/index";

export default function Home() {
  return (
    <main>
      <Header />
      <UserLogin />
    </main>
  );
}
