"use client";

import dynamic from "next/dynamic";

import "@/styles/signup.scss";

import Logo from "@/public/logo.svg";

import Danger from "@/components/Alerts/danger";


import Link from "next/link";

import Image from "next/image";

import { useVisibility } from "@/hooks/useVisibility";
import { useUserStore } from "@/providers/user";

import { useRef } from "react";

import { useRouter } from "next/navigation";

const SlSpinner = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/spinner/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);

function Signup() {
  const router = useRouter();

  const { reset, signup, error, loading, message } = useUserStore(
    (state) => state
  );
  const {
    isDangerAlertVisible,
    setDangerAlertVisibility,
    isSuccessAlertVisible,
  } = useVisibility(reset, error, loading, message);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const firstNameRef = useRef<HTMLInputElement | null>(null);
  const lastNameRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
     <div id="stripe-bar" className="w-full border-t-4 border-brand-400 absolute top-0 left-0 right-0 z-50" ></div>
      <div className="authenticate-page p-4 sm:p-0">
        <div className="mx-auto w-full text-center">
          <Image className="inline-block w-16 mt-8" src={Logo} alt="OnAir" />
          <h2 className="text-xl mt-4">Sign-up to OnAir</h2>
          <h3 className=" text-sm font-medium text-gray-600">
            7-days free trial, no credit card required
          </h3>
        </div>
        {/*Main panel*/}
        <div className="flex flex-col md:flex-row main-panel">
          {/*Left panel*/}
          <div className="hidden left-panel p-16">
            <div className="">
              <h2 className="mb-3 text-gray-700 text-2xl leading-8 font-bold">
                Walk-ins Welcome!
              </h2>

              {/*} Features list*/}
              <div className="mt-8">
                <ul role="list" className="mt-8 space-y-5 grid grid-rows">
                  <li className="flex items-end lg:col-span-1">
                    <div className="flex-shrink-0 text-green-400">
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
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
                    <p className="ml-3 text-sm text-gray-700">Value prop one</p>
                  </li>

                  <li className="flex items-end lg:col-span-1">
                    <div className="flex-shrink-0 text-green-400">
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ display: "inline-block" }}
                      >
                        {" "}
                        <use xlinkHref="/feather-sprite.svg#check-circle"></use>{" "}
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">Value prop two</p>
                  </li>

                  <li className="flex items-end lg:col-span-1">
                    <div className="flex-shrink-0 text-green-400">
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ display: "inline-block" }}
                      >
                        {" "}
                        <use xlinkHref="/feather-sprite.svg#check-circle"></use>{" "}
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">
                      Value prop three
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/*Right panel*/}
          <div className="w-full sp-form auth-form py-4 px-4 md:py-16 md:px-16">
            {/*Social signin partial*/}
     
            {isDangerAlertVisible ? (
          
                <Danger
                  message={error?.message || "ERROR"}
                  click={() => {
                    setDangerAlertVisibility(false);
                  }}
                />
   
            ) : null}
            {loading && <SlSpinner></SlSpinner>}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Signup</span>
                </div>
              </div>
            </div>

            <form
              className="new_user"
              id="new_user"
              onSubmit={(e) => {
                e.preventDefault();
                const email = emailRef?.current?.value || "";
                const password = passwordRef?.current?.value || null;
                const confirmPassword =
                  confirmPasswordRef.current?.value || null;
                const fullName =
                  (firstNameRef?.current?.value || "") +
                  " " +
                  (lastNameRef?.current?.value || "");

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
                signup({ email, password, fullName, confirmPassword }, router);
              }}
            >
              <input
                autoFocus={true}
                autoComplete="autocomplete"
                className="w-full sm:text-sm"
                placeholder="Email"
                type="email"
                name="user[email]"
                id="user_email"
                ref={emailRef}
              />

              <div className="mt-4 flex justify-between">
                <div className="w-1/2">
                  <input
                    autoComplete="autocomplete"
                    className="w-full sm:text-sm"
                    placeholder="First Name"
                    type="text"
                    name="user[first_name]"
                    id="user_first_name"
                    ref={firstNameRef}
                  />
                </div>

                <div className="w-1/2 ml-2">
                  <input
                    autoComplete="autocomplete"
                    className="w-full sm:text-sm"
                    placeholder="Last Name"
                    type="text"
                    name="user[last_name]"
                    id="user_last_name"
                    ref={lastNameRef}
                  />
                </div>
              </div>

              <input
                autoComplete="true"
                className="mt-4 w-full sm:text-sm"
                placeholder="Password"
                type="password"
                name="user[password]"
                id="user_password"
                ref={passwordRef}
              />

              <input
                autoComplete="new-password"
                className="mt-4 w-full sm:text-sm"
                placeholder="Confirm Password"
                type="password"
                name="user[password_confirmation]"
                id="user_password_confirmation"
                ref={confirmPasswordRef}
              />

              <div className="mt-8 block w-full rounded-md shadow-sm">
                <input
                  type="submit"
                  name="commit"
                  value="Sign up"
                  className="w-full btn btn-blue"
                  data-disable-with="Sign up"
                />
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Already have an account?
                <Link href="/users/sign_in" className="authentication-link">
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
