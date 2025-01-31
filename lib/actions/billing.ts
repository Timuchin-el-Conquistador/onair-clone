"use server"; 

import { verifySession } from "../dal";

import { redirect } from "next/navigation";

import { Plan } from "../types/billing";

import { fakeBackend } from "../axios";


export async function retrievePlans() {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/billing-plans`;
    const response: { billingPlans: Plan[] } = await fakeBackend.get(
      path
    );

    return response.billingPlans;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}


export async function retrieveSubscription() {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/subscription/`;
    const response: { message: string; subscription:any } = await fakeBackend.get(
      path
    );

    return response.subscription;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}




export async function createSubscriptionSessionAction(planId:string) {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/create-subscription-session/`;
    const response: { message: string; session:any } = await fakeBackend.post(
      path,{planId}
    );

    return response.session;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}


export async function removeSubscription(planId:string) {
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/remove-subscription/`;
    const response: { message: string; session:any } = await fakeBackend.delete(
      path,
    );

    return response.session;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}