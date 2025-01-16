"use server"; // ill import in home page to load tests on prerender stage

import { fakeBackend } from "../axios";
import { verifySession } from "../dal";

import { redirect } from "next/navigation";

import { Session } from "../types/call";


export async function retrieveActiveSessions(slug:string) {
  try {
    const session = await verifySession();

    
    if (!session)   return  redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/urls/${slug}/calls/sessions`;

    const response:{sessions:Session[],message:string} = await fakeBackend.get(
      path,
    );

    return response.sessions;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}
