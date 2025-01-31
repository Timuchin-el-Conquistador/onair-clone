import Success from "@/public/payment-failed.png";
import "@/styles/subscription/index.scss";
import Link from "next/link";
import Image from "next/image";

async function PaymentFailed() {
  return (
    <div className="subscription-result">
      <Image src={Success} alt="" />
      <span>Your Payment Failed</span>

      <Link href="/dashboard">Back to Dashboard</Link>
    </div>
  );
}

export default PaymentFailed;
