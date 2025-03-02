import { fakeBackend } from "../axios";
import { Call } from "../types/call";

import { type ExtendedLink } from "../types/links";
import {  AccountStatus } from "../types/user";



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
//owner account status
export async function retrieveUserAccountStatus(email: string) {

  try {
    const path = `api/v1/user/${email}/account-status`;
    const response: { message: string; accountStatus: AccountStatus, role:string } =
      await fakeBackend.get(path);

      return {accountStatus:response.accountStatus, role:response.role};
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
}