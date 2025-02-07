"use server";

import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";

import { Session } from "./types/user";

import { redirect } from "next/navigation";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(
  payload:Session
) {
  return new SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.error("Failed to verify session");
    return null;
  }
}

export async function createSession(
  user: Session
) {
  //const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt(user);

  await cookies().set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function updateSession(
  field: keyof Session,
  value: any
) {
  "use server";

  const cookie = await cookies().get("session")?.value;
  const payload = (await decrypt(cookie)) as Session


  payload[field] = value;

  const session = await encrypt(payload);

  await cookies().set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export async function updateSubscription(
  planName: string,
  monthlyLinksCapacity: number,
  monthlyIntegrationsCapacity: number,
  subscriptionStatus: string
) {
  "use server";

  const cookie = await cookies().get("session")?.value;

  let payload = (await decrypt(cookie)) as Session


  payload ={
    ...payload,
    planName,
    monthlyLinksCapacity,
    monthlyIntegrationsCapacity,
    subscriptionStatus,
  }

  const session = await encrypt(payload);

  await cookies().set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}
export async function retrieveSession() {
  "use server";

  const cookie = (await cookies()).get("session");
  const session = await decrypt(cookie?.value);

  if (!session?.userId) {
    return null;
  }
  return session;
}
export async function deleteSessionAction() {
  "use server";
  // Access cookies and delete the session cookie
  const cookieStore = await cookies();
  cookieStore.delete("session"); // Delete the 'session' cookie

  // After logging out, redirect to the sign-in page
  redirect("/users/sign_in");
}
