"use client";

import SubmitBtn from "@/components/Buttons/submit";
import Danger from "@/components/Alerts/danger";
import Success from "@/components/Alerts/success";
import Spinner from "@/components/Loaders/spinner";

import "@/styles/otp.scss";

import { useEffect, useRef } from "react";
import OTPInput from "@/components/Inputs/otp";

import PageHeader from "@/components/auth/page-header";

import { useUserStore } from "@/providers/user";

import { useRouter } from "next/navigation";
import { useVisibility } from "@/hooks/useVisibility";

function OTP() {
  const router = useRouter();

  const { submitOTP, resendToEmailOTP, loading, error, message } = useUserStore(
    (state) => state
  );

  const {
    isDangerAlertVisible,
    setDangerAlertVisibility,
    isSuccessAlertVisible,
  } = useVisibility();

  const emailRef = useRef("");
  useEffect(() => {
    emailRef.current = sessionStorage.getItem("email") || "";
  });
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (value: string, index: number) => {
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus(); // Move to the next input
    }
  };





  return (
    <main className="flex flex-col justify-center items-center restore-password ">
      <div className="flex flex-col items-center">
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle opacity="0.48" cx="36" cy="36" r="36" fill="#EADFFC" />
          <circle opacity="0.64" cx="36" cy="36" r="24" fill="#D5C0F8" />
          <path
            d="M41 45.25H31C27.35 45.25 25.25 43.15 25.25 39.5V32.5C25.25 28.85 27.35 26.75 31 26.75H41C44.65 26.75 46.75 28.85 46.75 32.5V39.5C46.75 43.15 44.65 45.25 41 45.25ZM31 28.25C28.14 28.25 26.75 29.64 26.75 32.5V39.5C26.75 42.36 28.14 43.75 31 43.75H41C43.86 43.75 45.25 42.36 45.25 39.5V32.5C45.25 29.64 43.86 28.25 41 28.25H31Z"
            fill="#7356C0"
          />
          <path
            d="M35.9998 36.87C35.1598 36.87 34.3098 36.61 33.6598 36.08L30.5298 33.58C30.2098 33.32 30.1498 32.85 30.4098 32.53C30.6698 32.21 31.1398 32.15 31.4598 32.41L34.5898 34.91C35.3498 35.52 36.6398 35.52 37.3998 34.91L40.5298 32.41C40.8498 32.15 41.3298 32.2 41.5798 32.53C41.8398 32.85 41.7898 33.33 41.4598 33.58L38.3298 36.08C37.6898 36.61 36.8398 36.87 35.9998 36.87Z"
            fill="#7356C0"
          />
        </svg>

        <PageHeader
          header="Check your Email"
          subheader={`We sent a confirmation code to ${emailRef.current}`}
        />
        <form
          method="get"
          className="flex flex-col justify-center items-center"
          data-group-name="digits"
          data-autosubmit="false"
          autoComplete="off"
          onSubmit={(event) => {
            event.preventDefault();
            let otp = "";
            for (let index = 0; index < inputsRef.current.length; index++) {
              if (!inputsRef.current[index]?.value.length) {
                inputsRef.current[index]?.focus();
                return;
              }
              otp += inputsRef.current[index]?.value;
            }
            console.log(otp);
            submitOTP(otp, router);
          }}
        >
          <div className="mb-4 flex">
            <OTPInput
              id="digit-1"
              name="digit-1"
              next="digit-2"
              previous=""
              change={(digit1) => {
                handleInputChange(digit1, 0);
              }}
              ref={(el) => {
                inputsRef.current[0] = el; // Assign without returning anything
              }}
            />
            <OTPInput
              id="digit-2"
              name="digit-2"
              next="digit-3"
              previous="digit-1"
              change={(digit2) => {
                handleInputChange(digit2, 1);
              }}
              ref={(el) => {
                inputsRef.current[1] = el; // Assign without returning anything
              }}
            />
            <OTPInput
              id="digit-3"
              name="digit-3"
              next="digit-4"
              previous="digit-2"
              change={(digit3) => {
                handleInputChange(digit3, 2);
              }}
              ref={(el) => {
                inputsRef.current[2] = el; // Assign without returning anything
              }}
            />
            <OTPInput
              id="digit-4"
              name="digit-4"
              next=""
              previous="digit-3"
              change={(digit4) => {
                handleInputChange(digit4, 3);
              }}
              ref={(el) => {
                inputsRef.current[3] = el; // Assign without returning anything
              }}
            />
          </div>
          <SubmitBtn label="Send" />
          <div className="flex items-center justify-center restore-password__resend mt-4">
            <p>Didn’t receive the email?</p>
            <button
              type="button"
              onClick={() => {
                //  resendOtpEmail(email);

                resendToEmailOTP();
              }}
            >
              Send again
            </button>
          </div>
        </form>
      </div>

      {isSuccessAlertVisible ? (
        <div className="fixed bottom-0 w-screen flex justify-center">
     <Success message={message!} />
        </div>
      ) : null}
      {isDangerAlertVisible ? (
        <div className="fixed bottom-0 w-screen flex justify-center">
          <Danger
            message={error?.message || ""}
            click={() => {
              setDangerAlertVisibility(false);
            }}
          />
        </div>
      ) : null}
      {loading ? <Spinner /> : null}
    </main>
  );
}

export default OTP;
