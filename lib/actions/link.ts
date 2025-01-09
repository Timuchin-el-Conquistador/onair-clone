"use server";

import { verifySession } from "../dal";

import { redirect } from "next/navigation";

import { fakeBackend } from "../axios";

import { type Link, type Settings } from "../types/links";

export async function createUrl(
  slug: string,
  linkName: string,
  callStrategy: string,
  availability: string,
  settings: Settings
) {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/url?owner=${session.userId}`;
    const response: { message: string } = await fakeBackend.post(
      path,
      { slug, linkName, callStrategy, availability, settings }
    );

    return response;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}

export async function retrieveUrls() {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/urls`;
    const response: { message: string; urls: Link[] } = await fakeBackend.get(
      path
    );

    return response.urls;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}
