"use server";

import { type PaymentMethod } from "@stripe/stripe-js";

import { verifySession } from "@/lib/dal";

import axios, { type AxiosResponse } from "axios";
import { handleAxiosError } from "@/utils/axios";

import { type SubscriptionRequest } from "@/utils/dtos/stripe";

export async function subscribe(
  stripeCustomerId: string | null,
  priceId: string,
  paymentMethod: PaymentMethod
) {
  try {
    const session = await verifySession();
    if (!session) return null;

    console.log(process.env.PRODUCTION_URL);
    if (stripeCustomerId) {
      await axios.post(
        `${process.env.PRODUCTION_URL}/api/v1/test-app/user/update-customer`,
        {
          customerId: stripeCustomerId,
          paymentMethod: paymentMethod?.id,
          user_id: session.userId,
        }
      );
    } else {
      await axios.post(
        `${process.env.PRODUCTION_URL}/api/v1/test-app/user/create-customer`,
        {
          customer: {
            email: session.email,
            name: session.fullName,
            //phone: session.phoneNumber,
          },
          paymentMethod: paymentMethod?.id,
          user_id: session.userId,
        }
      );
    }

    /*
    if (subscribed) {
      //if already subscribed and want to upgrade or downgrade package

      response = await axios.post<AxiosResponse>(
        `${process.env.REACT_APP_PRODUCTION_HOST}/api/v1/test-app/customer/change-subscription/${session.userId}`,
        {
          subscriptionId,
          priceId,
        } as SubscriptionRequest
      );
    } else {*/
    //creating new subscription
    const response: AxiosResponse = await axios.post<AxiosResponse>(
      `${process.env.PRODUCTION_URL}/api/v1/test-app/user/create-subscription`,
      {
        customerId: stripeCustomerId,
        priceId,
        user_id: session.userId,
      } as SubscriptionRequest
    );
    // }

    return response.data;
  } catch (err) {
    return { message: handleAxiosError(err).message, status: "failed" };
  }
}

export async function cancelSubscription(subscriptionId: string) {
  const session = await verifySession();
  if (!session) return null;
  try {
    const response: AxiosResponse = await axios.delete<AxiosResponse>(
      `${process.env.PRODUCTION_URL}/api/v1/test-app/user/${session.userId}/cancel-subscription/${subscriptionId}`
    );
    console.log(response)
    return response.data;
  } catch (err) {
    return { message: handleAxiosError(err).message, status: "failed" };
  }
}
