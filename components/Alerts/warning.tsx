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
  children?:React.ReactNode
}

function NoDevice(props:PageProps) {
  return (
    <div className="p-4 border-l-4 mx-6 mb-0 mt-6 bg-yellow-50 border-yellow-400 ">

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
</div>
  );
}



export  {NoDevice}