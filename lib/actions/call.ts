"use server";

import { redirect } from "next/navigation";

import { fakeBackend } from "../axios";

import { type Call } from "../types/call";

import { verifySession } from "../dal";

export async function retrieveCalls() {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");
    const path = `api/v1/user/${session.email}/calls`;
    const response: { message: string; calls: Call[] } = await fakeBackend.get(
      path
    );
    return response.calls;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}


export async function retrieveCall(callId:string) {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");
    const path = `api/v1/user/${session.email}/calls/${callId}`;

    const response: { message: string; session: Call } = await fakeBackend.get(
      path
    );

    return response.session;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}
