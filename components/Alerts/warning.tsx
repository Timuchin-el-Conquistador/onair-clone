"use client";

import dynamic from "next/dynamic";

import "@/styles/pages.new.scss";

const SlAlert = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/alert/index.js"),
  {
    // loading: () => <>Loading...</>,
    ssr: false,
  }
);
const SlIcon = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/icon/index.js"),
  {
    //   loading: () => <>Loading...</>,
    ssr: false,
  }
);

type PageProps = {
  children?: React.ReactNode;
  closeNoIntegratedDevicesAlert:() => void
};

function NoDevice(props: PageProps) {
  return (

      <div className="w-full px-6 pt-4">
        <div id="download-mobile-app-template" className="alert-duration">
          <div className="sm:flex bg-white items-center rounded-lg border border-gray-200 w-full p-6 relative">
            <span className="absolute cursor-pointer bg-white h-6 w-6 flex items-center justify-center border border-gray-300 rounded-full -right-2 -top-2" onClick={() => {
              props.closeNoIntegratedDevicesAlert()
            }}>
            <svg
                width="12"
                height="12"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                id=""
                className="text-gray-900"
                style={{ display: "inline-block" }}
              >
                <use xlinkHref="/feather-sprite.svg#x"></use>
              </svg>
            </span>{" "}
            <div className="mr-4 flex items-start">
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                id=""
                className="mr-2 mt-0 sm:mt-1"
                style={{ display: "inline-block", color: "rgb(217, 119, 7)" }}
              >
                <use xlinkHref="/feather-sprite.svg#alert-triangle"></use>
              </svg>{" "}
              <div>
                <h2 className="text-sm sm:text-base font-bold">
                  Reduce missed calls
                </h2>{" "}
                <p className="text-sm mb-1">
                  Download OnAir mobile app to stay connected
                  wherever you are.
                </p>
              </div>
            </div>{" "}
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
        </div>
      </div>
   
   
  );
}

export { NoDevice };
