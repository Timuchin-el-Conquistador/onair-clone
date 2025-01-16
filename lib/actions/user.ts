"use server"; // ill import in home page to load tests on prerender stage

import { verifySession } from "../dal";





export async function retrieveSession() {
  try {
    const session = await verifySession();
    if (!session)   return  null;

    return session;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}
