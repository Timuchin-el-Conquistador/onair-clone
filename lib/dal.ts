"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decrypt } from "./session";
import { cache } from "react";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return {
    isAuth: true,
    userId: session.userId,
    email: session.email,
    fullName: session.fullName,
    phoneNumber: session.phoneNumber,
  };
});
