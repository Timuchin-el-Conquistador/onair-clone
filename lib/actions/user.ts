"use server"; 

import { verifySession } from "../dal";




export async function retrieveSession() {
  try {
    const session = await verifySession();
    console.log('session', session)
    if (!session)   return  null;

    return null;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}





