"use client";

import SubmitBtn from "@/components/Buttons/submit";
import TextInput from "@/components/Inputs/text";
import Danger from "@/components/Alerts/danger";
import Success from "@/components/Alerts/success";
import Spinner from "@/components/Loaders/spinner";

import { useVisibility } from "@/hooks/useVisibility";

import { useRouter } from "next/navigation";

import "@/styles/restore-password.scss";

import PageHeader from "@/components/auth/page-header";

import { useUserStore } from "@/providers/user";

import { useEffect, useRef } from "react";



function ResetPassword() {
  const router = useRouter();

  const { resetPassword, loading, error } = useUserStore(
    (state) => state
  );

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

  const btnRef = useRef<string|null>(null)

  const {
    isDangerAlertVisible,
    setDangerAlertVisibility,
    isPasswordVisible,
    setPasswordVisibility,
  } = useVisibility();

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
            d="M39.5 31.5L43 28M45 26L43 28L45 26ZM35.39 35.61C35.9064 36.1195 36.3168 36.726 36.5978 37.3948C36.8787 38.0635 37.0246 38.7813 37.0271 39.5066C37.0295 40.232 36.8884 40.9507 36.6119 41.6213C36.3355 42.2919 35.9291 42.9012 35.4162 43.4141C34.9033 43.9271 34.294 44.3334 33.6233 44.6099C32.9527 44.8864 32.234 45.0275 31.5087 45.025C30.7833 45.0226 30.0656 44.8767 29.3968 44.5958C28.7281 44.3148 28.1215 43.9043 27.612 43.388C26.6102 42.3507 26.0558 40.9614 26.0683 39.5193C26.0809 38.0772 26.6593 36.6977 27.679 35.678C28.6988 34.6583 30.0782 34.0798 31.5203 34.0673C32.9624 34.0548 34.3517 34.6091 35.389 35.611L35.39 35.61ZM35.39 35.61L39.5 31.5L35.39 35.61ZM39.5 31.5L42.5 34.5L46 31L43 28L39.5 31.5Z"
            stroke="#7356C0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <PageHeader
          header="Set new password"
          subheader="Your new password must be different to previously used passwords."
        />
        <form
          onSubmit={(event) => {
            event.preventDefault();

            const password = passwordRef.current?.value || null;
            const confirmPassword = confirmPasswordRef.current?.value || null;

            if (password == null) {
              passwordRef.current?.focus();
              setDangerAlertVisibility(true); //danger alert pops up on error => error message mutation and loading mutatition in other components
            } else if (confirmPassword == null) {
              //i put it here cause if user gets same error message alert wont pop up after user closed it (no message mutation)
              confirmPasswordRef.current?.focus(); //cause in store i dont do netwroks request loading is always false when i send request to store when one of 3 errors is true(no loading mutation)
              setDangerAlertVisibility(true); //that is why need to change state to true to show alerts here not in useEffect (to avoid redundancy or mo when no effect happend)
            } else if (confirmPassword != password) {
              setDangerAlertVisibility(true);
            }
            resetPassword(password, confirmPassword, router);
          }}
        >
          <div className="form-group">
            <TextInput
              label="Password"
              type={isPasswordVisible && btnRef.current == 'password' ? 'text' :'password'}
              ref={(el) => {
                passwordRef.current = el;
              }}
            >
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 8.33333V6.66667C5 3.90833 5.83333 1.66667 10 1.66667C14.1667 1.66667 15 3.90833 15 6.66667V8.33333"
                    stroke="#8F9BB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.1667 18.3333H5.83334C2.50001 18.3333 1.66667 17.5 1.66667 14.1667V12.5C1.66667 9.16667 2.50001 8.33333 5.83334 8.33333H14.1667C17.5 8.33333 18.3333 9.16667 18.3333 12.5V14.1667C18.3333 17.5 17.5 18.3333 14.1667 18.3333Z"
                    stroke="#8F9BB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.3304 13.3333H13.3379"
                    stroke="#8F9BB3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.99624 13.3333H10.0037"
                    stroke="#8F9BB3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66209 13.3333H6.66957"
                    stroke="#8F9BB3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <button
                  className="eye"
                  type="button"
                  onClick={() => {
                    setPasswordVisibility((prevState) => !prevState);
                    btnRef.current = 'password'

                  }}
                >
                  {isPasswordVisible && btnRef.current == 'password' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 5C7.25 5 3.27 8.11 1.64 12C3.27 15.89 7.25 19 12 19C16.75 19 20.73 15.89 22.36 12C20.73 8.11 16.75 5 12 5Z"
                        stroke="#8F9BB3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="#8F9BB3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1 1L23 23"
                        stroke="#8F9BB3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 5C7.25 5 3.27 8.11 1.64 12C3.27 15.89 7.25 19 12 19C16.75 19 20.73 15.89 22.36 12C20.73 8.11 16.75 5 12 5Z"
                        stroke="#8F9BB3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="#8F9BB3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </>
            </TextInput>
          </div>
          <div className="form-group">
            <TextInput
              label="Confirm Password"
              type={isPasswordVisible && btnRef.current == 'confirm-password' ? 'text' :'password'}
              ref={(el) => {
                confirmPasswordRef.current = el;

              }}
            >
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 8.33333V6.66667C5 3.90833 5.83333 1.66667 10 1.66667C14.1667 1.66667 15 3.90833 15 6.66667V8.33333"
                    stroke="#8F9BB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.1667 18.3333H5.83334C2.50001 18.3333 1.66667 17.5 1.66667 14.1667V12.5C1.66667 9.16667 2.50001 8.33333 5.83334 8.33333H14.1667C17.5 8.33333 18.3333 9.16667 18.3333 12.5V14.1667C18.3333 17.5 17.5 18.3333 14.1667 18.3333Z"
                    stroke="#8F9BB3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.3304 13.3333H13.3379"
                    stroke="#8F9BB3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.99624 13.3333H10.0037"
                    stroke="#8F9BB3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.66209 13.3333H6.66957"
                    stroke="#8F9BB3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <button
                  className="eye"
                  type="button"
                  onClick={() => {
                    setPasswordVisibility((prevState) => !prevState);
                    btnRef.current = 'confirm-password'
                  }}
                >
                  {isPasswordVisible && btnRef.current == 'confirm-password' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 5C7.25 5 3.27 8.11 1.64 12C3.27 15.89 7.25 19 12 19C16.75 19 20.73 15.89 22.36 12C20.73 8.11 16.75 5 12 5Z"
                        stroke="#8F9BB3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="#8F9BB3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1 1L23 23"
                        stroke="#8F9BB3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 5C7.25 5 3.27 8.11 1.64 12C3.27 15.89 7.25 19 12 19C16.75 19 20.73 15.89 22.36 12C20.73 8.11 16.75 5 12 5Z"
                        stroke="#8F9BB3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="#8F9BB3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </>
            </TextInput>
          </div>
          <div className="form-group">
            <SubmitBtn label="Reset Password" />
          </div>
        </form>
      </div>

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

export default ResetPassword;
