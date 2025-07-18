"use client";
import dynamic from "next/dynamic";

import "@/styles/user-confirmation.scss";

import { useUserStore } from "@/providers/user";

import { useRouter } from "next/navigation";

import { useVisibility } from "@/hooks/alerts-visibility";

import { useRef } from "react";

import Danger from "@/components/Alerts/danger";

const SlSpinner = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/spinner/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);

function ForgotPassword() {
  const router = useRouter();

  const { error, loading, success, reset, forgotPassword } =
    useUserStore((state) => state);
  const {
    isDangerAlertVisible,
    setDangerAlertVisibility,
    isPasswordVisible,
    setPasswordVisibility,
  } = useVisibility(reset, error, loading, success);

  const emailRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
     <div id="stripe-bar" className="w-full border-t-4 border-brand-400 absolute top-0 left-0 right-0 z-50" ></div>
      <div className="mx-auto w-full text-center">
        <img className="inline-block w-16 mt-8" src="/logo-white.svg" alt="Shoporia" />
        <h2 className="text-xl mt-4">Reset Your Password</h2>
      </div>
      <div className="authenticate-page p-4 sm:p-0">
        <div className="flex flex-col md:flex-row main-panel">
          <div className="hidden left-panel p-16">
            <div className="">
              <h2 className="mb-3 text-gray-700 text-2xl leading-8 font-bold">
                Walk-ins Welcome!
              </h2>

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
                        className=""
                        id=""
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
                        className=""
                        id=""
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

          <div className="w-full sp-form auth-form py-4 px-4 md:py-16 md:px-16">
            {loading && <SlSpinner></SlSpinner>}

            <form
              className="new_user"
              id="new_user"
              onSubmit={(event) => {
                event.preventDefault();
                const email = emailRef?.current?.value || "";

                forgotPassword(email, router);
              }}
            >
          

              <div>
                <label htmlFor="user_email">Email</label>
                <input
                  autoFocus
                  autoComplete="email"
                  className="w-full sm:text-sm"
                  type="email"
                  name="user[email]"
                  id="user_email"
                  ref={emailRef}
                />
              </div>

              <div className="mt-6 mb-2">
                <input
                  type="submit"
                  name="commit"
                  value="Send me reset password instructions"
                  className="w-full btn btn-blue"
                  data-disable-with="Send me reset password instructions"
                />
              </div>

              <a className="authentication-link" href="/users/sign_in">
                Log in
              </a>
              <span className="text-gray-500"> with your account.</span>
              <br />

              <a className="authentication-link" href="/users/sign_up">
                Sign up
              </a>
              <span className="text-gray-500"> for a new account.</span>
              <br />
      
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
