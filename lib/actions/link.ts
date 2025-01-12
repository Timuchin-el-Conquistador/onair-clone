"use server";

import { verifySession } from "../dal";

import { redirect } from "next/navigation";

import { fakeBackend } from "../axios";

import { type ExtendedLink, type Integration, type Settings } from "../types/links";
import { type Device } from "../types/device";

export async function createUrlAction(
  slug: string,
  linkName: string,
  callStrategy: string|null,
  connectedDevices:string[],
  integrations:string[],
  availability: string,
  settings: Settings
) {
  'use server'
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/urls/`;
    const response: { message: string } = await fakeBackend.post(
      path,
      { slug, linkName, callStrategy,connectedDevices,integrations, availability, settings }
    );

    return response.message;
  } catch (error) {
     throw error;

  }
}

export async function retrieveUrls() {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/urls`;
    const response: { message: string; urls: ExtendedLink[] } = await fakeBackend.get(
      path
    );

    return response.urls;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}


export async function retrieveIntegrations() {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/integrations/`;
    const response: { message: string; integrations: Integration[] } = await fakeBackend.get(
      path
    );

    return response.integrations;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}


export async function retrieveConnectedDevices() {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/devices/`;
    const response: { message: string; connectedDevices: Device[] } = await fakeBackend.get(
      path
    );

    return response.connectedDevices;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}
