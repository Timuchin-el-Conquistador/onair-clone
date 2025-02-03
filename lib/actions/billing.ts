"use server"; 

import { verifySession } from "../dal";

import { redirect } from "next/navigation";

import { Plan } from "../types/billing";

import { fakeBackend } from "../axios";
import { updateSession } from "../session";


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
  'user server'
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/create-subscription-session/`;
    const response: { message: string; url:string } = await fakeBackend.post(
      path,{planId}
    );

    return response.url;
  } catch (error) {

    return error instanceof Error ? error.message : null
  }
}

export async function createBillingPortalSession(planId:string) {
  'user server'
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/update-subscription/`;
    const response: { message: string; url:string } = await fakeBackend.post(
      path,{planId}
    );

    return response.url;
  } catch (error) {

    return error instanceof Error ? error.message : null
  }
}


export async function removeSubscriptionAction() {
    'user server'
  try {
    const session = await verifySession();

    if (!session) return redirect("/users/sign_in");

    const path = `api/v1/user/${session.email}/cancel-subscription/`;
    const response: { message: string } = await fakeBackend.delete(
      path,
    );
    await updateSession('subscriptionStatus', 'canceled')
    
    return response.message;
  } catch (error) {
    return error instanceof Error ? error.message : null
  }
}