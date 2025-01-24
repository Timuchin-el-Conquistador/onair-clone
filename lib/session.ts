"use server";

import { SignJWT, jwtVerify,JWTPayload  } from "jose";
import { cookies } from 'next/headers'
import { SessionUser } from "./types/user";

import { redirect } from "next/navigation";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload:  SessionUser) {

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
    console.log(payload, 'payload')
    return payload;
  } catch (error) {
    console.error("Failed to verify session");
    return null
  }
}

export async function createSession(user:SessionUser) {

  //const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt(user);

   await cookies().set("session", session, {
    httpOnly: true,
    secure:  process.env.NODE_ENV === "production",
    path: "/",  


  });


}

export async function updateSession() {
  const session =await cookies().get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

 

  await cookies().set("session", session, {
    httpOnly: true,
    secure:  process.env.NODE_ENV === "production",

    path: "/",


  });
}



export async function deleteSessionAction() {
  'use server'
  // Access cookies and delete the session cookie
  const cookieStore = await cookies();
  cookieStore.delete('session'); // Delete the 'session' cookie

  // After logging out, redirect to the sign-in page
  redirect('/users/sign_in');
}