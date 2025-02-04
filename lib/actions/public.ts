import { fakeBackend } from "../axios";
import { Call } from "../types/call";

import { type ExtendedLink } from "../types/links";
import {  AccountStatus } from "../types/user";

export async function confirmEmail(token: string) {
  try {
    const path = `api/v1/user/confirm-email/${token}`;
    const response: { message: string } = await fakeBackend.get(path);

    return response.message;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}

export async function retrieveUrl(slug: string) {
  try {
    const path = `api/v1/url/${slug}`;
    const response: { message: string; url: ExtendedLink } =
      await fakeBackend.get(path);
    return response.url;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}

export async function retrieveActiveCallSession(callId: string) {
  try {
    const path = `api/v1/call/live-session/${callId}`;
    const response: { message: string; session: Call } = await fakeBackend.get(
      path
    );
    return response.session;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}

export async function retrieveAccountStatus(ownerId: string) {

  try {
    const path = `api/v1/user/account-status/${ownerId}`;
    const response: { message: string; accountStatus: AccountStatus } =
      await fakeBackend.get(path);

      return response.accountStatus;
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
}
