"use client";

import "@/styles/calls/waiting-room.scss";
import "@/styles/modal.scss";

import dynamic from "next/dynamic";
import Timer from "./timer";

const SlSpinner = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/spinner/index.js"),
  {
    //loading: () => <>Loading...</>,
    ssr: false,
  }
);



type ComponentProps = {
  linkName:string
}

function ConnectingCall(props:ComponentProps) {

  return (

      <div
        id="visitor-dialog"
        className="modal-dialog no-transition visible"
        style={{ position: "relative", top: "0", left: "0", height:'fit-content' }}
      >
        <div className="status-card m-3">
          <div className="status online"></div>{" "}
          <div className="title">{props.linkName}</div>{" "}
          <div className="subtitle">Online</div>
        </div>{" "}
        <div className="m-3 mt-6">
          <div className="text-center my-4">
            <SlSpinner></SlSpinner>
          </div>{" "}
          <div>Ringing... may take 1-3 minutes. Keep this window open.</div>{" "}
          <Timer />
        </div>
      </div>

  );
}

export default ConnectingCall;
