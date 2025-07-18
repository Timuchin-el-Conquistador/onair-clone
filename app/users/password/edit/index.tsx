"use client";
import dynamic from "next/dynamic";

import "@/styles/user-confirmation.scss";

import { useUserStore } from "@/providers/user";

import { useRouter } from "next/navigation";

import { useVisibility } from "@/hooks/alerts-visibility";

import { useRef } from "react";



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

function ResetPassword(props: { token: string }) {
  const router = useRouter();

  const { error, loading, success, reset, resetPassword } = useUserStore(
    (state) => state
  );
  const {
    isDangerAlertVisible,
    setDangerAlertVisibility,
    isPasswordVisible,
    setPasswordVisibility,
  } = useVisibility(reset, error, loading, success);

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <div
        id="stripe-bar"
        className="w-full border-t-4 border-brand-400 absolute top-0 left-0 right-0 z-50"
      ></div>
      <div className="mx-auto w-full text-center">
        <img className="inline-block w-16 mt-8" src="/logo-white.svg" alt="Shoporia" />
        <h2 className="text-xl mt-4">Change Your Password </h2>
      </div>
      <div className="authenticate-page p-4 sm:p-0">

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
                        <use xlinkHref="/images/feather-sprite.svg#check-circle"></use>{" "}
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
                        style={{ display: "inline-block;" }}
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
                        style={{ display: "inline-block;" }}
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

                const password = passwordRef.current?.value || null;
                const confirmPassword =
                  confirmPasswordRef.current?.value || null;

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
                resetPassword(password, confirmPassword, props.token, router);
              }}
            >
              <div>
                <label htmlFor="user_password">New password</label>
                <input
                  autoFocus
                  autoComplete="new-password"
                  className="w-full sm:text-sm"
                  type="password"
                  name="user[password]"
                  id="user_password"
                  ref={passwordRef}
                />
                <span className="text-sm text-blue-500">
                  <em>(6 characters minimum)</em>
                </span>
              </div>
              <div className="mt-6">
                <label htmlFor="user_password_confirmation">
                  Confirm new password
                </label>
                <br />
                <input
                  autoComplete="new-password"
                  className="w-full sm:text-sm"
                  type="password"
                  name="user[password_confirmation]"
                  id="user_password_confirmation"
                  ref={confirmPasswordRef}
                />
              </div>
              <div className="mt-6 mb-2">
                <input
                  type="submit"
                  name="commit"
                  value="Change my password"
                  className="w-full btn btn-blue"
                  data-disable-with="Change my password"
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

export default ResetPassword;
