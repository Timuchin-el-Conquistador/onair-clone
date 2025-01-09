'use client'

import dynamic from "next/dynamic";

import '@/styles/Forms/visitor.scss'
import '@/styles/modal.scss'
import { useState } from "react";

const SlButton = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/button/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);
const SlSwitch = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/switch/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);
const SlDialog = dynamic(
  // Notice how we use the full path to the component. If you only do `import("@shoelace-style/shoelace/dist/react")` you will load the entire component library and not get tree shaking.
  () => import("@shoelace-style/shoelace/dist/react/dialog/index.js"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const SlIcon = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/icon/index.js"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const SlInput = dynamic(
    () => import("@shoelace-style/shoelace/dist/react/input/index.js"),
    {
      loading: () => <p>Loading...</p>,
      ssr: false,
    }
  );
  const SlSpinner = dynamic(
    () => import("@shoelace-style/shoelace/dist/react/spinner/index.js"),
    {
      loading: () => <p>Loading...</p>,
      ssr: false,
    }
  );
  

function Visitor({initCall}:{initCall:() => void}) {

  const [settingModalVisibility, setSettingModalVisibility] = useState(false);
  const [selectAudioDeviceModalVisibility, setSelectAudioDeviceModalVisibility] = useState(true);
  return (
    <div id="main" className="mt-4 sm:mt-20">
      <div
        id="visitor-dialog"
        className="modal-dialog no-transition visible"
        style={{ marginLeft: "-180px", marginTop: "-250.75px" }}
      >
        <div className="status-card m-3">
          <div className="status online"></div>{" "}
          <div className="title">Meeting with Cengiz</div>{" "}
          <div className="subtitle">Online</div>
        </div>{" "}
        <div>
          <div>
            <div className="m-3 max-w-sm">
              Introduce yourself and press call.
            </div>{" "}
            <SlInput
              name="visitor-name"
              label="Name*"
              type="text"
              size="medium"
              form=""
              data-optional=""
              data-valid=""
              className=""
            >
              <SlIcon
                slot="suffix"
                name="x-circle"
                aria-hidden="true"
                library="default"
                className="text-red-600"
                style={{display: "none"}}
              ></SlIcon>
            </SlInput>{" "}
            <SlInput
              name="visitor-email"
              label="Email*"
              type="email"
              size="medium"
              form=""
              data-optional=""
              data-valid=""
              className=""
            >
                <SlIcon
                slot="suffix"
                name="x-circle"
                aria-hidden="true"
                library="default"
                className="text-red-600"
                style={{display: "none"}}
              ></SlIcon>
            </SlInput>{" "}
            <SlInput
              name="visitor-phone"
              label="Phone*"
              type="tel"
              size="medium"
              form=""
              data-optional=""
              data-valid=""
              className=""
            >
             <SlIcon
                slot="suffix"
                name="x-circle"
                aria-hidden="true"
                library="default"
                className="text-red-600"
                style={{display: "none"}}
              ></SlIcon>
            </SlInput>{" "}
            <div className="flex flex-col p-3">
              <div className="xs:flex items-center justify-between">
                <SlSwitch size="medium" form="" data-optional="" data-valid="">
                  <span className="text-sm">Enable Audio</span>
                </SlSwitch>{" "}
              </div>{" "}
              <div className="flex items-center mt-2">
                <SlSpinner style={{ display: "none" }}></SlSpinner>{" "}
                <p className="text-sm ml-2 text-gray-500"></p>
              </div>
            </div>{" "}
            <div className="text-center mt-4">
              <SlButton
                variant="primary"
                onClick={initCall}
                size="medium"
                data-optional=""
                data-valid=""

              >
                Call
              </SlButton>
            </div>
          </div>
        </div>
      </div>{" "}
      <div>
        <SlDialog no-header="" className="media-permission-modal" label="" open={settingModalVisibility}>

          <div className="dialog-body">
            <div className="flex items-center">
              <h3 className="text-base sm:text-xl ml-2 font-medium text-gray-900">
                Enable media devices
              </h3>
            </div>{" "}
            <div className="text-sm sm:text-base pt-4">
              <p>You can turn off your media devices anytime you want.</p>
            </div>{" "}
            <div className="text-sm sm:text-base ml-5 my-2">
              <ol className="list-decimal text-gray-600 leading-tight">
                <li>In "System Settings" open "Privacy &amp; Security"</li>{" "}
                <li>
                  Allow this browser to access your media devices and relaunch
                  the browser
                </li>
              </ol>
            </div>
          </div>
        </SlDialog>{" "}
        <SlDialog className="media-permission-modal unrecognized-error" label="">
          <div slot="label">
            <div className="flex items-center">
              <svg
                width="25"
                height="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                id=""
                className="text-red-400"
                style={{ display: "inline-block" }}
              >
                <use xlinkHref="/feather-sprite.svg#alert-triangle"></use>
              </svg>{" "}
              <span className="text-base sm:text-xl font-medium ml-2 text-gray-900">
                Error occurred
              </span>
            </div>
          </div>{" "}
          <div className="dialog-body !py-0 text-sm sm:text-base">
            <div>
              <p>Here are some suggestions to help troubleshoot the issue:</p>
            </div>{" "}
            <div className="ml-3 pt-2 pb-4">
              <ol className="list-disc text-gray-600 leading-tight">
                <li>
                  Ensure that your browser has permission to access media
                  devices
                </li>{" "}
                <li>Make sure your browser is up-to-date</li>{" "}
                <li>Try using a different browser</li>{" "}
                <li>
                  Check that it is not being blocked by antivirus software
                </li>{" "}
                <li>
                  Simple restart of your browser can resolve temporary glitches
                </li>
              </ol>
            </div>{" "}
            <div>
              <p>
                Still stuck? Contact{" "}
                <a href="/support" className="cusor-pointer">
                  support page
                </a>{" "}
                for help!
              </p>
            </div>
          </div>
        </SlDialog>{" "}
        <SlDialog no-header="" className="media-permission-modal" label="">
          <div className="dialog-body">
            <div className="flex items-center">
              {" "}
              <span className="text-base sm:text-xl font-medium ml-2 text-gray-900">
                Enable media devices
              </span>
            </div>{" "}
            <div className="text-sm sm:text-base pt-4">
              <p>Please grant permission from your browser settings:</p>
            </div>{" "}
            <div className="text-sm sm:text-base py-2">
              <ol className="text-gray-600 leading-tight">
                <li>
                  1. Click the page info
                  <span className="px-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 inline-block -mt-0.5 text-gray-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                      ></path>
                    </svg>
                  </span>
                  icon in your browser's address bar
                </li>{" "}
                <li>2. Turn on the media devices and reload the page</li>
              </ol>
            </div>
          </div>
        </SlDialog>{" "}
        <SlDialog
          no-header=""
          className="media-permission-modal mobile-permissions"
          label=""
        >
          <div className="dialog-body">
            <div className="flex items-center">
              {" "}
              <span className="text-base sm:text-xl ml-2 font-medium text-gray-900">
                Enable media devices
              </span>
            </div>{" "}
            <div className="text-sm sm:text-base pt-4">
              <p>Allow Microsoft Edge to access media devices:</p>
            </div>{" "}
            <div className="py-2 text-sm sm:text-base">
              <ol className="text-gray-600 leading-tight">
                <li>1. Open device settings</li>{" "}
                <li>2. Search for "Microsoft Edge" in settings</li>{" "}
                <li>3. Enable media devices</li> <li>4. Refresh the page</li>
              </ol>{" "}
              <div className="w-full flex items-center mt-4">
                <img
                  src="/enable-mic-camera-guide-edge.gif"
                  alt="Enable Microphone Permissions"
                  className="mx-auto w-80"
                />
              </div>
            </div>
          </div>
        </SlDialog>{" "}
        <SlDialog
          no-header=""
          className="media-permission-modal ask-user-to-alow-modal"
          label=""
        >
          <div className="dialog-body">
            <div className="flex justify-center">
              <svg
                width="70"
                height="70"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                id=""
                className="text-green-500"
                style={{ display: "inline-block" }}
              >
                <use xlinkHref="/feather-sprite.svg#arrow-up-left"></use>
              </svg>
            </div>{" "}
            <div className="mt-2">
              <h3 className="text-center">
                Click <b>Allow</b> to use camera
              </h3>
            </div>
          </div>
        </SlDialog>{" "}
        <SlDialog no-header="" className="media-permission-modal" label="">
          <div className="dialog-body">
            <div className="flex items-center">
              <svg
                width="25"
                height="25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                id=""
                className="text-red-400"
                style={{ display: "inline-block" }}
              >
                <use xlinkHref="/feather-sprite.svg#alert-circle"></use>
              </svg>{" "}
              <span className="text-xl font-medium ml-2 text-gray-900">
                Close other apps
              </span>
            </div>{" "}
            <div className="text-sm sm:text-base py-4">
              <p>
                Another app or browser tab may be using your media devices.
                Please close them and try again.
              </p>
            </div>
          </div>
        </SlDialog>
      </div>{" "}
      <SlDialog label="Settings" className="dialog-overview with-header" open={selectAudioDeviceModalVisibility}>

        <div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm">Microphone</span>{" "}
            <select style={{ width: "200px", fontSize: "13px" }}>
              <option value="" >
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

export default Visitor;
