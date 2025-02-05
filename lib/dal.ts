"use server";

import { cookies } from "next/headers";
import { decrypt } from "./session";
import { cache } from "react";
import { Session } from "./types/user";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session");
  const session = await decrypt(cookie?.value) as Session

  if (!session?.id) {
    return null;
  }

  return {
    isAuth: true,
    id: session.id,
    email: session.email,
    fullName: session.fullName,
    subscriptionStatus:session.subscriptionStatus,
    watchedTutorial:session.watchedTutorial
  };
});

