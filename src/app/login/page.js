import Image from "next/image";
import Header from "@/components/header/index";
import UserLogin from "@/components/auth/user/index";

export default function Login() {
  return (
    <main>
      <Header />
      <UserLogin />
    </main>
  );
}
