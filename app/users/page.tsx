"use client";

import ConfirmEmail from "@/components/Presentational/confirm-email";
import "@/styles/login.scss";



import { useRouter } from "next/navigation";




function Login() {
  const router = useRouter();

  return (
   <ConfirmEmail/>
  );
}

export default Login;
