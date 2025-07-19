

"use server";

import { verifySession } from "../dal";

import { redirect } from "next/navigation";

import { type User, type Account } from "../types/user";
import { type Integration } from "../types/integration";

import { fakeBackend } from "../axios";

export async function confirmEmail(token: string) {
  try {
    const path = `api/v1/user/confirm-email/${token}`;
    const response: { message: string } = await fakeBackend.get(path);

    return response.message;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}

export async function retrieveUser() {
  try {
    const user = await verifySession();

    if (!user) return redirect("/users/sign_in");

    return user;
  } catch (error) {
    return redirect("/users/sign_in");
  }
}

export async function retrieveStoreIntegrations() {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/integrations/stores`;
    const response: { message: string; stores: Integration[] } =
      await fakeBackend.get(path);

    return response.stores;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}

export async function retrieveDevices() {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/integrations/devices`;

    const response: { message: string; devices: Integration[] } =
      await fakeBackend.get(path);

    return response.devices;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}

export async function hasDeviceIntegrations() {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/integrations/has-device-integrations`;

    const response: { message: string; hasDeviceIntegartions: boolean } =
      await fakeBackend.get(path);

    return response.hasDeviceIntegartions;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}

export async function retrieveIntegrations() {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/integrations/`;
    const response: { message: string; integrations: Integration[] } =
      await fakeBackend.get(path);

    return response.integrations;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}
export async function retrieveIntegrationsActions() {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/integrations/`;
    const response: { message: string; integrations: Integration[] } =
      await fakeBackend.get(path);

      return {
        status: 200,
        message: response.message,
        integrations: response.integrations,
      };
    } catch (error: any) {
      return {
        status: error.status,
        message: error instanceof Error ? error.message : String(error),
        integrations: [],
      };
    }
}
export async function retrieveIntegration(integrationId: string) {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/integrations/${integrationId}`;

    const response: { message: string; integration: Integration } =
      await fakeBackend.get(path);

    return response.integration;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}

export async function removeIntegration(integrationId: string) {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/integrations/${integrationId}`;

    const response: { message: string } = await fakeBackend.delete(path);

    return { status: 200, message: response.message };
  } catch (error: any) {
    return {
      status: error.status,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function retrieveAccountInformation() {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}`;

    const response: { message: string; account: Account } =
      await fakeBackend.get(path);

    return response.account;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}

export async function createShopifyIntegrationAction(storeDomain: string) {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/integrations/shopify/store/create`;

    const response: { message: string; authUrl?: string } =
      await fakeBackend.post(path, { storeDomain });

    return {
      status: 200,
      message: response.message,
      authUrl: response.authUrl,
    };
  } catch (error: any) {
    return {
      status: error.status,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function retrieveCustomerAccountInformationAction(email: string) {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${email}`;

    const response: { message: string; account: User } = await fakeBackend.get(
      path
    );

    return {
      status: 200,
      message: response.message,
      account: response.account,
    };
  } catch (error) {
    return {
      status: 400,
      message: error instanceof Error ? error.message : String(error),
      account: null,
    };
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





//store

export async function selectAgentAvatarAction(
  integrationId:string,
  presenterId: string,
  driverId: string,
  voice: { id: string; provider: string }
) {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/integrations/${integrationId}/agent`;
    const response: { message: string } =
      await fakeBackend.put(path, { presenterId, driverId, voice });

      return {
        status: 200,
        message: response.message,

      };
    } catch (error: any) {
      return {
        status: error.status,
        message: error instanceof Error ? error.message : String(error),

      };
    }
}
