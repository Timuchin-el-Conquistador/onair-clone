"use client";

import Success from "@/public/payment-success.png";
import "@/styles/subscription/index.scss";
import Link from "next/link";
import Image from "next/image";
import { updateSession } from "@/lib/session";
import { retrieveSubscription } from "@/lib/actions/billing";
import { useEffect } from "react";

function PaymentSuccess() {
  useEffect(() => {
    const modifyCookie = async () => {
      const subscription = await retrieveSubscription();
      await updateSession(subscription.active);
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
