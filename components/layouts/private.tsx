"use client";

import "@/styles/layouts.scss";

import Sidebar from "../sidebar";

import Warning from "../Alerts/warning";

import { useEffect, useState } from "react";

function PrivateLayout({
  children,
  page,
  hasActiveDevices,
}: {
  children: React.ReactNode;
  page: string;
  hasActiveDevices?: boolean;
}) {
  const [isNoDeviceWarningVisible, setNoDeviceWarningVisibility] =
    useState(false);

  useEffect(() => {
    if (hasActiveDevices) return;
    if (page != "calls" && page != "dashboard") return;
    const noDeviceWarningTimeout = setTimeout(() => {
      setNoDeviceWarningVisibility(true);
    }, 1000);
    return () => {
      clearTimeout(noDeviceWarningTimeout);
    };
  }, [hasActiveDevices]);

  return (
    <div className="flex overflow-hidden bg-gray-100 h-screen">
      <Sidebar page={page} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          {isNoDeviceWarningVisible && (
            <Warning>
              <div className="sm:flex  items-center">
                <div>
                  <strong className="text-sm sm:text-base font-bold">
                    Reduce missed calls
                  </strong>
                  <p className="text-sm mb-1">
                    Download OnAir mobile app to receive calls and stay
                    connected wherever you are.
                  </p>
                </div>
                <br />
                <div className="md:ml-auto flex items-center justify-evenly mt-3 sm:mt-0">
                  <a
                    href="/ios"
                    target="_blank"
                    className="sm:mr-2 flex justify-center items-center bg-black hover:bg-gray-800 text-white w-36 h-12 rounded-md transition-colors duration-300"
                  >
                    <img
                      src="/external-logos/apple-white-logo.svg"
                      alt="Apple"
                      className="w-8 h-8 mr-2"
                    />{" "}
                    <div>
                      <span className="block text-[10px]">Download from</span>{" "}
                      <span className="block text-[13px] font-medium">
                        Apple Store
                      </span>
                    </div>
                  </a>{" "}
                  <a
                    href="/android"
                    target="_blank"
                    className="flex justify-center items-center bg-black hover:bg-gray-800 text-white w-36 h-12 rounded-md transition-colors duration-300"
                  >
                    <img
                      src="/external-logos/google-play-store.svg"
                      alt="Google"
                      className="w-8 h-8 mr-2"
                    />{" "}
                    <div>
                      <span className="block text-[10px]">Download from</span>{" "}
                      <span className="block text-[13px] font-medium">
                        Google Play
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </Warning>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}

export default PrivateLayout;
