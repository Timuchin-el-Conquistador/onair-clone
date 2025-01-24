"use server";

import { verifySession } from "../dal";

import { redirect } from "next/navigation";

import { fakeBackend } from "../axios";

import { type ExtendedLink, type Settings } from "../types/links";


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

export async function retrieveUrlAction(slug:string) {
  'use server'
  try {   const session = await verifySession();

    if (!session) return redirect("/users/sign_in");
    const path = `api/v1/user/${session.email}/urls/${slug}`;
    const response: { message: string; url: ExtendedLink } = await fakeBackend.get(
      path
    );
    return response.url;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}


