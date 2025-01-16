"use client";

import dynamic from "next/dynamic";

const SlButton = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/button/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);

const SlDialog = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/dialog/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);

const SlSpinner = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/spinner/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);

function CallEnded() {
  return (
    <div id="conference-container">
      <SlDialog no-header="" label="" className="dialog-deny-close" open={true}>
        <div className="text-center" style={{ display: "none" }}>
          You have left the channel.{" "}
          <span className="text-blue-500 cursor-pointer">Refresh</span> to
          rejoin.
        </div>{" "}
        <div className="p-6">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-700">Call ended</h2>
          </div>{" "}
          <p className="text-gray-700 mt-2">
            This call is no longer active.{" "}
            <span>
              You can start a new one from the{" "}
              <a href="https://onair.io/mina" className="text-blue-500">
                call link
              </a>
              .
            </span>
          </p>
        </div>
      </SlDialog>{" "}
      <SlDialog no-header="" label="" className="dialog-deny-close">
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Ending Call</h2>{" "}
          <SlSpinner className="text-xl ml-2 -mb-0.5"></SlSpinner>
        </div>{" "}
        <p className="text-gray-700">This might take a few moments.</p>
      </SlDialog>{" "}
      <SlDialog
        label="End Call Options"
        className="dialog-over-view"
        style={
          {
            "--body-spacing": "0px 20px 20px 20px",
          } as React.CSSProperties & Record<string, string>
        }
      >
        <div className="flex mb-4">
          <input
            id="leave-session"
            value="leave-session"
            name="user-leave-session"
            type="radio"
            className="h-4 w-4 cursor-pointer border-gray-300 mt-1"
          />{" "}
          <label
            htmlFor="leave-session"
            className="ml-3 block leading-6 cursor-pointer text-gray-900"
          >
            Leave the Call
            <span className="block text-xs text-gray-500">
              Leave the call so you can rejoin from another device or allow
              another member of your organization to join
            </span>
          </label>
        </div>{" "}
        <div className="flex">
          <input
            id="end-session"
            value="end-session"
            name="user-ended-session"
            type="radio"
            className="h-4 w-4 cursor-pointer border-gray-300 mt-1"
          />{" "}
          <label
            htmlFor="end-session"
            className="ml-3 block leading-6 cursor-pointer text-gray-900"
          >
            End the Call
            <span className="block text-xs text-gray-500">
              End the call for all participants
            </span>
          </label>
        </div>{" "}
        <div className="flex justify-end mt-6 pb-1">
          <SlButton
            disabled
            variant="success"
            size="medium"
            data-optional=""
            data-valid=""
          >
            Continue
          </SlButton>
        </div>
      </SlDialog>{" "}
      <SlDialog
        label="settings"
        className="dialog-over-view"
        style={
          {
            "--body-spacing": "0px 20px 20px 20px",
            "--width": "350px",
            padding: "var(--body-spacing)",
            width: "var(--width)",
          } as React.CSSProperties & Record<string, string>
        }
      >
        <div className="flex flex-col gap-4">
          <button className="text-left px-4 py-2 hover:bg-gray-100 rounded flex items-center gap-2">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              id=""
              style={{ display: "inline-block" }}
            >
              <use xlinkHref="/feather-sprite.svg#monitor"></use>
            </svg>
            Screen Sharing
          </button>{" "}
          <button className="text-left px-4 py-2 hover:bg-gray-100 rounded flex items-center gap-2">
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              id=""
              style={{ display: "inline-block" }}
            >
              <use xlinkHref="/feather-sprite.svg#settings"></use>
            </svg>
            Media Settings
          </button>
        </div>
      </SlDialog>{" "}
      <audio preload="none" className="hidden">
        <source src="/audio/joined-session.wav" type="audio/wav" />
      </audio>{" "}
      <audio preload="none" className="hidden">
        <source src="/audio/left-session.wav" type="audio/wav" />
      </audio>{" "}
      <audio preload="none" className="hidden">
        <source src="/audio/new-session.wav" type="audio/wav" />
      </audio>{" "}
      <SlDialog label="Settings" className="dialog-overview with-header">
        <div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm">Microphone</span>{" "}
            <select style={{ width: "200px", fontSize: "13px" }}>
              <option value="" disabled>
                Select Audio Device
              </option>{" "}
            </select>
          </div>{" "}
        </div>{" "}
        <div className="p-5 pb-0 flex justify-center">
          <SlButton
            slot="footer"
            variant="primary"
            size="medium"
            data-optional=""
            data-valid=""
          >
            Close
          </SlButton>
        </div>
      </SlDialog>
    </div>
  );
}

export default CallEnded;
