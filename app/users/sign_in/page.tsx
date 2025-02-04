"use client";

import "@/styles/login.scss";

import dynamic from "next/dynamic";

import Image from "next/image";

import { useRef } from "react";


import { useUserStore } from "@/providers/user";

import Link from "next/link";

import "@/styles/login.scss";

import Logo from "@/public/logo-white.svg";


import { useVisibility } from "@/hooks/useAlertsVisibility";

import { useRouter } from "next/navigation";

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
function Login() {
  const router = useRouter();

  const { reset, error, loading, success, login } = useUserStore(
    (state) => state
  );
  const {
    isDangerAlertVisible,
    setDangerAlertVisibility,
    isPasswordVisible,
    setPasswordVisibility,
    isSuccessAlertVisible,
  } = useVisibility(reset, error, loading, success);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div
        id="stripe-bar"
        className="w-full border-t-4 border-brand-400 absolute top-0 left-0 right-0 z-50"
      ></div>
      <div className="mx-auto w-full text-center">
        <Image className="inline-block w-16 mt-8" src={Logo} alt="OnAir" />
        <h2 className="text-xl mt-4">Sign-in to your account</h2>
        <h3 className=" text-sm font-medium text-gray-600">
          or <Link href="/users/sign_up">start your 7-day free trial</Link>
        </h3>
      </div>
      <div className="authenticate-page p-4 sm:p-0">
        
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

            {loading && <SlSpinner></SlSpinner>}
            <div className="mb-6">
              {/*<div className="m-auto mb-6 grid grid-rows-2 gap-4">
      <a href="/oauth/google" className="social-sign-in-button bg-blue-500">
        <Image className="bg-white p-1 mr-4 w-8 h-8" src="/external-logos/google-icon.svg" alt="Google"/>
        <span>Sign in with Google</span>
      </a>
      <a href="/oauth/apple" className="social-sign-in-button bg-black">
        <Image className="bg-white p-1 mr-4 w-8 h-8" src="/external-logos/apple.svg" alt="Apple"/>
        <span>Sign in with Apple</span>
      </a>
    </div>*/}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Login</span>
                </div>
              </div>
            </div>

            <form
              className="new_user"
              id="new_user"
              onSubmit={(e) => {
                e.preventDefault();
                const email = emailRef?.current?.value || "";
                const password = passwordRef?.current?.value || "";
                login({ email, password }, router);
              }}
            >
              {/* Email*/}
              <input
                autoFocus
                autoComplete="email"
                className="w-full sm:text-sm"
                placeholder="Enter Email"
                type="email"
                name="user[email]"
                id="user_email"
                ref={emailRef}
              />
              {/*} Password*/}
              <input
                autoComplete="current-password"
                className="mt-4 w-full sm:text-sm"
                placeholder="Enter password"
                type="password"
                name="user[password]"
                id="user_password"
                ref={passwordRef}
              />
              <div className="mt-4 flex items-center">
                <div className="text-sm leading-5">
                  <Link
                    href="/users/password/new"
                    className="authentication-link"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div className="mt-6">
                <input
                  type="submit"
                  name="commit"
                  value="Log in"
                  className="w-full btn btn-blue"
                  data-disable-with="Log in"
                />
              </div>
              {/*<div class="mt-2 text-sm leading-5">
          <a href="/users/confirmation/new" class="authentication-link">
            Didn't receive confirmation instructions?
          </a>
        </div>*/}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
