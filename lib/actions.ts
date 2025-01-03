"use server"; // ill import in home page to load tests on prerender stage

import { fakeBackend } from "./axios";
import { verifySession } from "./dal";

import { type Test, type Question } from "./types/home";
import { type TestSubmitForm } from "./types/answers";



export async function loadTests() {
  try {
    const session = await verifySession();
    if (!session) return null
    const path = `api/v1/test-app/user/${session.userId}/tests`;

    const response: { message: string; tests: Test[] } = await fakeBackend.get(
      path
    );

    return response;
  } catch (error) {
    console.log('ERROR')
    return error instanceof Error ? error : new Error(String(error));
  }
}

export async function loadTest(testId: string) {
  try {
    const session = await verifySession();
    if (!session) return null
    const path = `api/v1/test-app/user/${session.userId}/test/${testId}`;

    const response: { _id: string; questions: Question[] } =
      await fakeBackend.get(path);

    return response;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}

export async function submitTestAnswers(testId: string, form: TestSubmitForm) {
  try {
    const session = await verifySession();
    if (!session) return null
    const path = `api/v1/test-app/user/${session.userId}/test/${testId}/submit-answers`;
    const response: { message: string; score: number } = await fakeBackend.post(
      path,
      form
    );

    return response;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}


export async function loadPlans() {
  try {
    const session = await verifySession();
    if (!session) return null
    const path = `api/v1/test-app/user/subscriptions/${session.userId}`;
    const response:{subscriptions:any[], stripeCustomerId:string} = await fakeBackend.get(
      path,
    );

    return response;
  } catch (error) {
    return error instanceof Error ? error : new Error(String(error));
  }
}
