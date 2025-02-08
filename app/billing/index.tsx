"use client";

import dynamic from "next/dynamic";

import "@/styles/billing/billing.scss";
import "@/styles/fag.scss";

import Link from "next/link";

import { useState } from "react";



type PageProps = {
  daysLeftToExpiration: number;
  planName: string;
  subscriptionStatus: string;
  removeSubscriptionAction: () => Promise<string | null>;

};
const SlAlert = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/alert/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);

const SlIcon = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/icon/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);
const SlSpinner = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/spinner/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);

function Billing(props: PageProps) {
  const [loading, setLoadingState] = useState(false);
  const [error, setErrorMessage] = useState<string>("");
  const [success, setSuccessMessage] = useState<string>("");


  return (
    <div id="billing" className="p-6">
      <div
        style={{
          position: "fixed",
          right: "15px",
          top: "15px",
          display: loading ? "block" : "hidden",
        }}
      >
        <SlAlert variant="primary" open={loading}>
          <SlIcon slot="icon" name="info-circle"></SlIcon>
          <div className="flex items-center">
            <strong>Canceling subscription</strong>

            <SlSpinner
              style={{ fontSize: "1rem", marginLeft: "1rem" }}
            ></SlSpinner>
          </div>
        </SlAlert>
      </div>

      <div
        style={{
          position: "fixed",
          right: "15px",
          top: "15px",
          display: success ? "block" : "hidden",
        }}
      >
        <SlAlert variant="success" open={!!success}>
          <SlIcon slot="icon" name="info-circle"></SlIcon>
          <div className="flex items-center">
            <strong>{success}</strong>
          </div>
        </SlAlert>
      </div>

      <div
        style={{
          position: "fixed",
          right: "15px",
          top: "15px",
          display: error ? "block" : "hidden",
        }}
      >
        <SlAlert variant="danger" open={!!error}>
          <SlIcon slot="icon" name="info-circle"></SlIcon>
          <div className="flex items-center">
            <strong>{error}</strong>
          </div>
        </SlAlert>
      </div>

      <div className="bg-white p-6">
        <div className="px-4 pb-8">
          <div className="grid grid-cols-3 gap-4 max-w-4xl mt-12">
            <div className="text-center">
              <div className="mb-4">
                <svg
                  width="84"
                  height="84"
                  fill="none"
                  stroke="#2ecc71"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  id=""
                  style={{ display: "inline-block" }}
                >
                  <use xlinkHref="/feather-sprite.svg#coffee"></use>
                </svg>
              </div>{" "}
              <div className="font-bold text-lg mb-2">{props.planName}</div>{" "}
              <div className="text-gray-800 mb-2"></div>
            </div>{" "}
            <div className="col-span-2 px-4 leading-8">
              {props.subscriptionStatus == "trialing" ? (
                `You're on a trial plan . Your trial ends after ${props.daysLeftToExpiration} days. Sign up to a paid plan and get full access by clicking on "Subscribe" below.`
              ) : props.subscriptionStatus == "trial_ended" ? (
                "Your trial ended. If you found value in using ShopLine, please consider subscribing. Sign up to a paid plan and get full access by clicking on 'Subscribe' below."
              ) : props.subscriptionStatus == "active" ? (
                <h2>
                  You're on a {props.planName}. <br />
                  Your subscription ends after {props.daysLeftToExpiration}{" "}
                  days.
                  <br />
                  To change subscription click "Subscribe" below
                </h2>
              ) : (
                <h2>
                  You' have no active subscription plan <br />
                  Sign up to a paid plan and get full access by clicking on
                  "Subscribe" below.
                </h2>
              )}
            </div>{" "}
            <div className="col-span-3 text-center mt-8">
              <Link
                href="/billing/choose_plan"
                className="btn btn-blue text-center mr-4"
              >
                Subscribe
              </Link>

              {props.subscriptionStatus == "active" && (
                <button
                  className="btn btn-red text-lg inline-block"
                  onClick={async () => {
                    try {
                      setLoadingState(true);
                      const response = await props.removeSubscriptionAction();

                      setLoadingState(false);

                      // router.replace("/dashboard");
                     
                      setSuccessMessage("Subscription was canceled");

                      setTimeout(() => {
                        setSuccessMessage("");
                      }, 3000);
                    } catch (err) {
                      setLoadingState(false);
                      //  setError(
                      //    err instanceof Error ? err : new Error(String(err))
                      //   );

                      setErrorMessage("Something went wrong");
                      setTimeout(() => {
                        setErrorMessage("");
                      }, 3000);
                    }
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>{" "}
        {/*} <div id="faq" className="mt-32" style={{ opacity: "1" }}>
          <h3>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ display: "inline-block" }}
              className=""
              id=""
            >
              {" "}
              <use xlinkHref="/feather-sprite.svg#plus-square"></use>{" "}
            </svg>
            Can I pay for my colleagues?
          </h3>{" "}
          <div className="answer">
            Yes. First make sure you have the right number of licenses (or
            "seats"). You need to purchase one seat for each colleague you
            invite, including yourself. Then create a{" "}
            <a href="/organizations">Organization</a>, and invite them under
            that organization. This will bring in all members under your billing
            account.
            <br />
            <br />
          </div>{" "}
          <h3>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ display: "inline-block" }}
              className=""
              id=""
            >
              {" "}
              <use xlinkHref="/feather-sprite.svg#plus-square"></use>{" "}
            </svg>
            Do you offer invoicing?
          </h3>{" "}
          <div className="answer">
            Custom invoicing is strictly offered for accounts with more than
            $1,500 USD monthly subscription.
          </div>
        </div>*/}
      </div>
    </div>
  );
}

export default Billing;
