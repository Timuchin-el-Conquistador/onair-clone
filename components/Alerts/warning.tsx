"use client";

import dynamic from "next/dynamic";

import "@/styles/pages.new.scss";

const SlAlert = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/alert/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);
const SlIcon = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/icon/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);

function Warning() {
  return (
    <SlAlert className="p-4 border-l-4 mx-6 mb-0 mt-6 bg-yellow-50 border-yellow-400 " variant="warning" open>
      <SlIcon slot="icon" name="exclamation-triangle"></SlIcon>
      <strong>Your session has ended</strong>
      <br />
      Please login again to continue.
    </SlAlert>
  );
}



export default Warning