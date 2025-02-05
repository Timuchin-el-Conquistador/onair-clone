"use server"; 

import { verifySession } from "../dal";

import { redirect } from "next/navigation";

import { type Account, type Integration } from "../types/user";
import { type Device } from "../types/device";

import { fakeBackend } from "../axios";







export async function retrieveUser() {
  try {
    const user = await verifySession();

    if (!user) return redirect("/users/sign_in");

    return user;
  } catch (error) {
   return redirect("/users/sign_in");
  }
}




export async function retrieveDevices() {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/devices/`;
    const response: { message: string; devices: Device[] } = await fakeBackend.get(
      path
    );

    return response.devices;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}

export async function retrieveIntegrations() {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/integrations/`;
    const response: { message: string; integrations: Integration[]} = await fakeBackend.get(
      path
    );

    return response.integrations;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}


export async function retrieveIntegration(integrationId:string) {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/integrations/${integrationId}`;

    const response: { message: string; integration:Integration  } = await fakeBackend.get(
      path
    );

    return response.integration
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}



export async function retrieveAccountInformationAction() {
  'use server'
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}`;

    const response: { message: string; account: Account } = await fakeBackend.get(
      path
    );


    return { status:200, message:response.message,account:response.account };
  } catch (error) {
    return { status:400, message: error instanceof Error ? error.message : String(error),account:null };
  }
}


export async function retrieveAccountInformation() {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}`;

    const response: { message: string; account: Account } = await fakeBackend.get(
      path
    );


    return response.account;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}


