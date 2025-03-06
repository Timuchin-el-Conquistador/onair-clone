"use client";

import dynamic from "next/dynamic";

import { useUserStore } from "@/providers/user";
import { useRouter } from "next/navigation";

import { useVisibility } from "@/hooks/alerts-visibility";



const SlSpinner = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/spinner/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);

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

function ConfirmEmail() {
  const router = useRouter();
  const {
    resendEmailConfirmationToken,
    reset,
    signup,
    error,
    loading,
    success,
  } = useUserStore((state) => state);

  const {
    isDangerAlertVisible,
    setDangerAlertVisibility,
    isSuccessAlertVisible,
  } = useVisibility(reset, error, loading, success);
  return (
    <>
      <div
        id="stripe-bar"
        className="w-full border-t-4 border-brand-400 absolute top-0 left-0 right-0 z-50"
      ></div>
      <div className="max-w-lg mx-auto mt-48 text-center px-8 sm:px-0">
        <div
          style={{
            position: "fixed",
            right: "15px",
            top: "15px",
            display: isSuccessAlertVisible ? "block" : "hidden",
          }}
        >
          <SlAlert variant="primary" open={isSuccessAlertVisible}>
            <SlIcon slot="icon" name="info-circle"></SlIcon>
            <strong>{success}</strong>
          </SlAlert>
        </div>

        <div
          style={{
            position: "fixed",
            right: "15px",
            top: "15px",
            display: isDangerAlertVisible ? "block" : "hidden",
          }}
        >
          <SlAlert variant="danger" open={isDangerAlertVisible}>
            <SlIcon slot="icon" name="exclamation-octagon"></SlIcon>
            <strong>{error?.message}</strong>
          </SlAlert>
        </div>
        {loading && <SlSpinner></SlSpinner>}
        <div className="text-center">
          <svg
            width="64"
            height="64"
            fill="none"
            stroke="#2ECC70"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: "inline-block" }}
            className=""
            id=""
          >
            {" "}
            <use xlinkHref="/feather-sprite.svg#check-circle"></use>{" "}
          </svg>
        </div>

        <div data-cy="big-message-title" className="mt-6 text-xl font-bold">
          Confirm Your Email
        </div>

        <div className="mt-6 text-base text-justify leading-6">
          You need to confirm your email before using ShopLine. Please check
          your inbox for confirmation link and further instructions. <br />
          <br />
          If you cannot immediately find the email, please check your SPAM
          folder and Promotions tab.
        </div>

        <div className="mt-4 flex items-center">
          <div className="text-sm leading-5">
            <button
              onClick={() => {
                resendEmailConfirmationToken(
                  sessionStorage.getItem("registration-email") ?? "",
                  router
                );
              }}
              className="authentication-link text-blue-400"
            >
              Resend confirmation?
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmEmail;
