"use client";

import "@/styles/login.scss";
import Logo from "@/public/logo.svg";

import Image from "next/image";

function Login() {
  return (
    <>
      <div className="mx-auto w-full text-center">
        <Image className="inline-block w-16 mt-8" src={Logo} alt="OnAir" />
        <h2 className="text-xl mt-4">Sign-in to your account</h2>
        <h3 className=" text-sm font-medium text-gray-600">
          or <a href="/users/sign_up">start your 7-day free trial</a>
        </h3>
      </div>
      <div className="authenticate-page p-4 sm:p-0">
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
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
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
                  <span className="px-2 bg-white text-gray-500">
                     Login
                  </span>
                </div>
              </div>
            </div>

            <form
              className="new_user"
              id="new_user"
              action="/users/sign_in"
              accept-charset="UTF-8"
              method="post"
            >
              <input
                type="hidden"
                name="authenticity_token"
                value="WgwbnxAI2FOxAkQdPAZ5A0XaKB-iwQemfBNpuQEO4O81f1ROBo3AiaeLgxh06VxgTltfVbwJKAeSB5RokP4QGg"
              />

              {/* Email*/}
              <input
                autoFocus
                autoComplete="email"
                className="w-full sm:text-sm"
                placeholder="Enter Email"
                type="email"
                value=""
                name="user[email]"
                id="user_email"
              />

              {/*} Password*/}
              <input
                autoComplete="current-password"
                className="mt-4 w-full sm:text-sm"
                placeholder="Enter password"
                type="password"
                name="user[password]"
                id="user_password"
              />

              <div className="mt-4 flex items-center">
                <div className="text-sm leading-5">
                  <a href="/users/password/new" className="authentication-link">
                    Forgot your password?
                  </a>
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

                <input
                  name="recaptcha_token"
                  type="hidden"
                  id="recaptcha_token_c8ed05862c8f13529b2f"
                  value="03AFcWeA4oRbX4RXO6FVI7OZA-AItm1P1nY2v8TJ-4ygvHmbfwFEUUlFdPl5BdPdRoX9HKkwLu98aYcfBCcvn4fBrsPD_jrNBfp55mOil1u20fUwdqd969M1ZjDYLqwLx81nDleop361epZ5n7t1z3CAvBmLd4SGmdLyVLJZFXM3prv99-yVO132oOcQI5ofS8cZ9fX0hLpRXWioCtlRfWGI13HaooZxrB1pu-YdSpb-giYwrLQyxgYhitHE493E9oeVRu5FX4N8K1oaDM9QYxdjC4JX5fnqx3QSAMnVLrQTsuNQ4PjjYFgn7aFQk4ZtHSaorqqgp9FuU13yciGFDWKVSsbFadWwWa6mtzriYGGqesh6D1AAAxb99mmpwfxHw3lxmduraC3bmAkgKigrRnWXXBjBkOYRtCqWk4oHVh12vxz7YZhXCQz6q2QApOQ8WAFTJSZMafSmiyUUB5OhnZMSyPi9RAklivD5BJ_xIFr3DARtRfhlgafrboyfXQuzkwV76rc8lsRBrvCA6vZWyAUitJVtQjIQ6PymjAqwY0ntb0578jDyO1OSEJ8FO7kAuF72SchU-7qlyilj3pzDDBqQsjt1I85OLXN-LuRKJiubw5RrAlwqwM_7cx1_J2jes7QqUnSXDMUjQsoyyYYeBsTWF2nj3Ue5KZzjMLKvxncANSdl6jawMnPaPfXCkz176sIVuV7VjvMrqFHHftwLR2xppPT5WK9cASgkx7o2koC8A0Qqm39uE-ieStaznmkOscE1CPPwdNgf7LbpTd1irjaqh8TmsgaHoiuFO0HtFXdHWLAAclIja7OPiso6rY3hEBy9TlPYD30-DV1ILG2tVuQYWnxZDnZxrDSytEDyemQ00E7GbtNSaqczk"
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
