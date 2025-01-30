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
