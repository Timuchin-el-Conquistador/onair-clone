"use client";

import dynamic from "next/dynamic";

import "@/styles/sidebar/index.scss";

import Link from "next/link";

import { useState } from "react";
import Image from "next/image";

const SlDrawer = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/drawer/index.js"),
  {
    // loading: () => <>Loading...</>,
    ssr: false,
  }
);

function Sidebar({
  page,
  email,
  fullName,
}: {
  page: string;
  email: string;
  fullName: string;
}) {
  const [drawer, setDrawerState] = useState<{
    isOpen: boolean;
  }>({
    isOpen: false,
  });

  return (
    <>
      <div id="dashboard-sidebar">
        <div className="hidden md:flex md:flex-shrink-0 h-full">
          <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-white overflow-y-auto">
            <div className="flex items-center justify-center pt-2 pb-2">
              <a href="/">
                <Image
                  className="inline-block"
                  src="/logo.svg"
                  alt="logo"
                  width={150}
                  height={0}
                />
              </a>
            </div>{" "}
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 bg-white">
                <div className="space-y-1">
                  <a
                    href="/dashboard"
                    className={`dashboard-button ${
                      (page == "dashboard" || page.includes("pages")) &&
                      "selected"
                    }`}
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="dashboard-sidebar-icon"
                      style={{ display: "inline-block" }}
                    >
                      <use xlinkHref="/feather-sprite.svg#home"></use>
                    </svg>
                    Dashboard
                  </a>{" "}
                  <a
                    href="/calls"
                    className={`dashboard-button ${
                      page == "calls" && "selected"
                    }`}
                  >
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="dashboard-sidebar-icon"
                      style={{ display: "inline-block" }}
                    >
                      <use xlinkHref="/feather-sprite.svg#phone"></use>
                    </svg>
                    Calls
                  </a>{" "}
                  {/*} <Link
                  href="/stats"
                  className={`dashboard-button ${
                    slug == "stats" && "selected"
                  }`}
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="dashboard-sidebar-icon"
                    style={{ display: "inline-block" }}
                  >
                    <use xlinkHref="/feather-sprite.svg#bar-chart-2"></use>
                  </svg>
                  Stats
                </Link>*/}
                </div>{" "}
                <div className="mt-8">
                  <h3 className="px-3 pb-1 text-xs leading-4 font-semibold text-gray-500 uppercase">
                    MORE
                  </h3>{" "}
                  <div className="mt-1 space-y-1">
                    {/*<a href="/organizations" className="advanced-buttons ">
                    <span className="text-gray-300">&gt; &nbsp;</span>{" "}
                    Organizations
                  </a>{" "}*/}
                    <a
                      href="/integrations"
                      className={`advanced-buttons ${
                        page == "integrations" && "selected"
                      }`}
                    >
                      <span className="text-gray-300">&gt; &nbsp;</span>{" "}
                      Integrations
                    </a>{" "}
                    <a
                      href="/settings"
                      className={`advanced-buttons ${
                        page == "settings" && "selected"
                      }`}
                    >
                      <span className="text-gray-300">&gt; &nbsp;</span>{" "}
                      Settings
                    </a>{" "}
                    <a
                      href="/billing"
                      className={`advanced-buttons ${
                        page == "billing" && "selected"
                      }`}
                    >
                      <span className="text-gray-300">&gt; &nbsp;</span> Billing
                    </a>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div id="mobile_toolbar" className="md:hidden">
        <div className="fixed z-50 grid grid-cols-3 mx-auto w-full h-16 bg-white border-t border-gray-200 bottom-0">
          <Link
            href="/dashboard"
            className="flex flex-col items-center justify-center w-full h-full "
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              id=""
              className="h-6 w-6 text-gray-700"
              style={{ display: "inline-block" }}
            >
              <use xlinkHref="/feather-sprite.svg#home"></use>
            </svg>{" "}
            <span className="text-xs block text-gray-700 mt-1">Dashboard</span>
          </Link>{" "}
          <Link
            href="/calls"
            className="flex flex-col items-center justify-center w-full h-full "
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              id=""
              className="h-6 w-6 text-gray-700"
              style={{ display: "inline-block" }}
            >
              <use xlinkHref="/feather-sprite.svg#phone"></use>
            </svg>{" "}
            <span className="text-xs block text-gray-700 mt-1">Calls</span>
          </Link>{" "}
        {/*}  <Link
            href="/stats"
            className="flex flex-col items-center justify-center w-full h-full "
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              id=""
              className="h-6 w-6 text-gray-700"
              style={{ display: "inline-block" }}
            >
              <use xlinkHref="/feather-sprite.svg#bar-chart-2"></use>
            </svg>{" "}
            <span className="text-xs block text-gray-700 mt-1">Stats</span>
          </Link>{" "}*/}
          <button
            className="flex flex-col items-center justify-center w-full h-full"
            onClick={() => {
              setDrawerState((prevState) => ({
                ...prevState,
                isOpen: true,
              }));
            }}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              id=""
              className="h-6 w-6 text-gray-700"
              style={{ display: "inline-block" }}
            >
              <use xlinkHref="/feather-sprite.svg#more-vertical"></use>
            </svg>{" "}
            <span className="text-xs block text-gray-700 mt-1">More</span>
          </button>
        </div>{" "}
        <SlDrawer
          label=""
          placement="end"
          className="sidepanel-mobile"
          open={drawer.isOpen}
          onSlAfterHide={() =>
            setDrawerState((prevState) => ({
              ...prevState,
              isOpen: false,
            }))
          }
        >
          <div slot="label" className="flex items-center pt-2">
            <Link href="/dashboard">
              <Image
                className="inline-block"
                src="/logo.svg"
                alt="logo"
                width={100}
                height={0}
              />
            </Link>
          </div>{" "}
          <div className="flex items-center space-x-2 pb-4">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-700">
              {fullName.split(' ')[0].split('')[0]}
            </div>{" "}
            <div>
              <p className="text-base font-medium text-gray-900">
               {fullName}
              </p>{" "}
              <p className="text-sm text-gray-500">{email}</p>
            </div>
          </div>{" "}
          <nav>
          <div className="mt-2 divide-y divide-gray-200 overflow-hidden">
              {/*}  <Link
                href="/organizations"
                className="flex items-center relative py-3 pl-2"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  id=""
                  className="h-5 w-5 text-gray-800"
                  style={{ display: "inline-block" }}
                >
                  <use xlinkHref="/feather-sprite.svg#users"></use>
                </svg>{" "}
                <p className="text-sm text-gray-600 ml-3 ">Organizations</p>{" "}
                <span className="absolute right-0 flex">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    id=""
                    className="h-5 w-5 text-gray-400"
                    style={{ display: "inline-block" }}
                  >
                    <use xlinkHref="/feather-sprite.svg#chevron-right"></use>
                  </svg>
                </span>
              </Link>{" "}*/}
              <Link
                href="/integrations"
                className="flex items-center relative py-3 pl-2"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  id=""
                  className="h-5 w-5 text-gray-800"
                  style={{ display: "inline-block" }}
                >
                  <use xlinkHref="/feather-sprite.svg#share-2"></use>
                </svg>{" "}
                <p className="text-sm text-gray-600 ml-3 ">Integrations</p>{" "}
                <span className="absolute right-0 flex">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    id=""
                    className="h-5 w-5 text-gray-400"
                    style={{ display: "inline-block" }}
                  >
                    <use xlinkHref="/feather-sprite.svg#chevron-right"></use>
                  </svg>
                </span>
              </Link>{" "}
              <Link
                href="/settings"
                className="flex items-center relative py-3 pl-2"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  id=""
                  className="h-5 w-5 text-gray-800"
                  style={{ display: "inline-block" }}
                >
                  <use xlinkHref="/feather-sprite.svg#settings"></use>
                </svg>{" "}
                <p className="text-sm text-gray-600 ml-3 ">Settings</p>{" "}
                <span className="absolute right-0 flex">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    id=""
                    className="h-5 w-5 text-gray-400"
                    style={{ display: "inline-block" }}
                  >
                    <use xlinkHref="/feather-sprite.svg#chevron-right"></use>
                  </svg>
                </span>
              </Link>{" "}
              <Link
                href="/users/sign_out"
                className="flex items-center relative py-3 pl-2"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  id=""
                  className="h-5 w-5 text-gray-800"
                  style={{ display: "inline-block" }}
                >
                  <use xlinkHref="/feather-sprite.svg#power"></use>
                </svg>{" "}
                <p className="text-sm text-gray-600 ml-3">Sign out</p>
              </Link>
            </div>
          </nav>
        </SlDrawer>
      </div>
    </>
  );
}

export default Sidebar;

{
  /*} <div classNameName="vertical">
          <div classNameName="flex justify-center items-center">
        <Link href="/dashboard">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="233"
          height="58"
          viewBox="0 0 233 58"
          fill="none"
        >
          <path
            d="M75.708 56.089C76.472 56.089 77.205 55.786 77.746 55.244C78.286 54.704 78.59 53.971 78.59 53.206V26.305C78.59 19.566 82.829 15.218 89.46 15.218C95.221 15.218 99.025 19.674 99.025 26.522V53.206C99.025 54.798 100.316 56.089 101.908 56.089H112.883C114.475 56.089 115.765 54.798 115.765 53.206V22.501C115.765 8.261 108.265 0 95.33 0C90.174 0 84.88 1.714 81.085 4.457C80.414 4.937 79.53 5.001 78.797 4.62C78.064 4.241 77.606 3.482 77.612 2.656H77.605C77.606 2.413 77.512 2.18 77.341 2.008C77.17 1.836 76.938 1.739 76.695 1.739H64.732C63.968 1.739 63.235 2.043 62.694 2.583C62.154 3.124 61.85 3.857 61.85 4.621V53.206C61.85 53.971 62.154 54.704 62.694 55.244C63.235 55.786 63.968 56.089 64.732 56.089H75.708Z"
            fill="#0056FF"
          />
          <path
            d="M136.788 57.502C125.266 57.502 118.091 50.762 118.091 40.11C118.091 30.109 125.157 23.914 138.201 22.935C138.201 22.935 149.439 22.053 152.6 21.804C153.062 21.768 153.418 21.382 153.418 20.919V20.87C153.418 15.544 150.158 12.718 144.179 12.718C138.224 12.718 134.585 14.648 133.596 18.186C133.24 19.452 132.085 20.326 130.77 20.326C128.463 20.326 125.05 20.326 122.565 20.325C121.7 20.325 120.879 19.943 120.322 19.282C119.764 18.62 119.527 17.747 119.674 16.895C121.396 6.567 131.004 0 145.049 0C160.81 0 169.723 8.805 169.723 24.348V53.153C169.723 53.931 169.414 54.679 168.864 55.228C168.313 55.779 167.566 56.089 166.788 56.089H156.199C155.475 56.089 154.86 55.559 154.752 54.844L154.72 54.647C154.589 53.779 154.001 53.048 153.18 52.734C152.897 52.626 152.602 52.573 152.308 52.573C151.751 52.573 151.2 52.764 150.756 53.13C147.524 55.809 142.386 57.502 136.788 57.502ZM150.844 33.079C150.764 33.079 150.684 33.082 150.604 33.09C148.152 33.309 145.049 33.588 145.049 33.588C137.766 34.24 135.157 35.871 135.157 39.348C135.157 43.262 137.548 45.11 142.657 45.11C149.071 45.11 153.527 41.958 153.527 35.762C153.527 35.009 153.21 34.29 152.654 33.781C152.158 33.328 151.511 33.079 150.844 33.079Z"
            fill="black"
          />
          <path
            d="M187.328 56.089H176.505C175.721 56.089 174.968 55.777 174.413 55.221C173.859 54.667 173.547 53.915 173.547 53.13V4.698C173.547 3.913 173.859 3.161 174.413 2.606C174.968 2.051 175.721 1.739 176.505 1.739H187.328C188.113 1.739 188.865 2.051 189.42 2.606C189.975 3.161 190.286 3.913 190.286 4.698V53.13C190.286 53.915 189.975 54.667 189.42 55.221C188.865 55.777 188.113 56.089 187.328 56.089Z"
            fill="black"
          />
          <path
            d="M208.747 56.089H197.778C197.013 56.089 196.279 55.784 195.738 55.243C195.197 54.702 194.893 53.969 194.893 53.203V4.733C194.893 3.968 195.197 3.234 195.738 2.693C196.279 2.152 197.013 1.848 197.778 1.848H209.695C209.949 1.848 210.193 1.949 210.372 2.129C210.551 2.309 210.652 2.554 210.651 2.807L210.658 2.808C210.654 3.744 211.192 4.597 212.037 4.995C212.365 5.15 212.717 5.226 213.066 5.226C213.617 5.226 214.162 5.037 214.603 4.672C217.459 2.356 221.358 0.977997 225.872 0.977997C227.109 0.977997 228.434 1.065 229.818 1.259C231.235 1.466 232.285 2.681 232.285 4.113V14.615C232.285 15.381 231.981 16.114 231.44 16.656C230.899 17.197 230.165 17.5 229.4 17.5H226.959C217.394 17.5 211.633 21.74 211.633 32.501V53.203C211.633 53.969 211.329 54.702 210.788 55.243C210.247 55.784 209.513 56.089 208.747 56.089Z"
            fill="black"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M30.5 57C46.2401 57 59 44.2401 59 28.5C59 12.7599 46.2401 0 30.5 0C14.7599 0 2.00003 12.7599 2.00003 28.5C2.00003 44.2401 14.7599 57 30.5 57ZM38.7385 29.9642C39.6035 29.9642 40.4196 30.3513 41.0962 31.0753L44.9258 35.0251C45.6303 35.7419 46 36.595 46 37.4839C46 38.3656 45.6373 39.2258 44.9467 39.9642C44.6468 40.2867 44.3399 40.595 44.0399 40.8889C44.0074 40.9213 43.9749 40.9535 43.9426 40.9856C43.5388 41.3869 43.1551 41.7682 42.8192 42.1864C42.8157 42.1936 42.8105 42.1989 42.8052 42.2043C42.8 42.2097 42.7948 42.2151 42.7913 42.2222C41.731 43.405 40.3778 44 38.7664 44C38.6269 44 38.4734 43.9928 38.327 43.9857C35.9344 43.828 33.7929 42.9032 32.1885 42.1219C27.9892 40.0358 24.3131 37.0753 21.2579 33.3262C18.7397 30.2151 17.0516 27.3118 15.9216 24.1792C15.4612 22.9032 14.8613 20.9534 15.0287 18.8602C15.1403 17.5627 15.6496 16.4444 16.5424 15.5269L18.9141 13.0681L18.928 13.0538C19.6256 12.3656 20.4487 12 21.2997 12C22.1507 12 22.9599 12.3656 23.6365 13.0538C24.0899 13.4839 24.5294 13.9427 24.9479 14.3871C25.1572 14.6165 25.3804 14.8458 25.5966 15.068L25.5966 15.0681L27.501 17.0251C28.9658 18.5305 28.9658 20.4803 27.501 21.9857C27.4033 22.086 27.3056 22.1882 27.2079 22.2904C27.1103 22.3925 27.0127 22.4946 26.915 22.595C26.8652 22.6468 26.8153 22.6989 26.7652 22.7511C26.2962 23.2403 25.8135 23.7436 25.2967 24.2294C25.7222 25.1971 26.3081 26.1505 27.1801 27.2832C28.9798 29.5556 30.8562 31.3118 32.9209 32.6595C33.1232 32.7885 33.3603 32.9104 33.6114 33.0394L33.6115 33.0394C33.6706 33.071 33.7306 33.1026 33.791 33.1345C33.9089 33.1966 34.0288 33.2598 34.1486 33.3262L36.3529 31.0681C37.0574 30.3441 37.8805 29.9642 38.7385 29.9642Z"
            fill="#0056FF"
          />
        </svg>
        </Link>
      </div>
        <nav>
    
      <h1>Hello world</h1>
      </nav>
    </div>*/
}
