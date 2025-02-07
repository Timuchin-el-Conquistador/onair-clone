"use server";

import { verifySession } from "../dal";

import { redirect } from "next/navigation";

import { fakeBackend } from "../axios";

import { type ExtendedLink, type Settings } from "../types/links";
import { updateSession } from "../session";

export async function createUrlAction(
  slug: string,
  linkName: string,
  callStrategy: string | null,
  connectedDevices: string[],
  //  integrations:string[],
  availability: string,
  settings: Settings
) {
  "use server";
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/urls/`;
    const response: { message: string } = await fakeBackend.post(path, {
      slug,
      linkName,
      callStrategy,
      connectedDevices,
      availability,
      settings,
      userId: session.userId,
    });
    await updateSession("watchedTutorial", true);
    return { status: 200, message: response.message };
  } catch (error) {
    return {
      status: 400,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function updateUrlAction(
  urlId: string,
  slug: string,
  linkName: string,
  callStrategy: string | null,
  connectedDevices: string[],
  availability: string,
  settings: Settings
) {
  "use server";
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/urls/${slug}`;

    const response: { message: string } = await fakeBackend.put(path, {
      slug,
      linkName,
      callStrategy,
      connectedDevices,
      availability,
      settings,
      urlId,
    });

    return { status: 200, message: response.message };
  } catch (error) {
    return {
      status: 400,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function removeLinkAction(slug: string) {
  "user server";
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/urls/${slug}`;
    const response: { message: string } = await fakeBackend.delete(path);

    return { status: 200, message: response.message };
  } catch (error) {
    return {
      status: 400,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function retrieveUrlsAction() {
  "use server";
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/urls`;
    const response: { message: string; urls: ExtendedLink[] } =
      await fakeBackend.get(path);

    return { status: 200, message: response.message, urls: response.urls };
  } catch (error) {
    return {
      status: 400,
      message: error instanceof Error ? error.message : String(error),
      urls: [],
    };
  }
}

export async function retrieveUrl(slug: string) {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");
    const path = `api/v1/user/${session.email}/urls/${slug}`;
    const response: { message: string; url: ExtendedLink } =
      await fakeBackend.get(path);
    return response.url;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}

//filter

export async function retrieveLinks() {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/links`;
    const response: {
      message: string;
      links: { linkName: string; slug: string }[];
    } = await fakeBackend.get(path);


    return response.links;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}
