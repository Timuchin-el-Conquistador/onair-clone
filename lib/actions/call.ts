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





export async function retrieveAudioRecordUrlAction(callId:string) {
  'use server'
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");
    const path = `api/v1/user/${session.email}/calls/${callId}/audio-record`;

    const response: { message: string; recordUrl: string } = await fakeBackend.get(
      path
    );

    return { status:200, message:response.message,recordUrl:response.recordUrl };
  } catch (error) {
    return { status:400, message: error instanceof Error ? error.message : String(error),recordUrl:null };
  }
}




