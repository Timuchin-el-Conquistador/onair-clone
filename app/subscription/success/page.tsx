"use client";

import Success from "@/public/payment-success.png";
import "@/styles/subscription/index.scss";

import Link from "next/link";

import Image from "next/image";

import { updateSubscription } from "@/lib/session";
import { retrieveAccountInformationAction } from "@/lib/actions/user";

import { useEffect } from "react";

function PaymentSuccess() {
  useEffect(() => {
    const modifyCookie = async () => {
      const response = await retrieveAccountInformationAction();
     
      if (response.status == 400) return;
      await updateSubscription(
        response.account!.planName,
        response.account!.monthlyLinksCapacity,
        response.account!.monthlyIntegrationsCapacity,
        response.account!.subscriptionStatus
      );
    };

    modifyCookie();
  }, []);
  return (
    <div className="subscription-result">
      <Image src={Success} alt="" />
      <span>Your Payment Has Been Successfully Received</span>
      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  );
}

export default PaymentSuccess;
