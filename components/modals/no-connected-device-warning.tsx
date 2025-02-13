"use client";

import dynamic from "next/dynamic";


const SlDialog = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/dialog/index.js"),
  {
    // loading: () => <>Loading...</>,
    ssr: false,
  }
);

const SlButton = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/button/index.js"),
  {
    // loading: () => <>Loading...</>,
    ssr: false,
  }
);
type ComponentProps = {
  isNoConnectedMobileDeviceModalVisible: boolean;
  proceedWithoutConnectingDevice: () => void;
  continueEditingLink: () => void;
};
function NoConnectedDeviceWarning(props: ComponentProps) {
  return (
    <SlDialog
      noHeader
      className="dialog-overview"
      open={props.isNoConnectedMobileDeviceModalVisible}
      onSlAfterHide={() => {
        props.continueEditingLink();
      }}
    >
      <div className="pb-2 px-2">
        <h2 className="text-xl font-bold text-gray-700 mb-2">Heads up</h2>{" "}
        <p className="text-gray-700 text-sm">
          You did not link your (mobile device), and will be able to receive
          calls only via web app, if you want to receive calls via your phone
          link your device
          <span className="block mt-1">
            To fix this, go back, scroll to the 'Devices' section, and specify a
            phone (or more).
          </span>
        </p>{" "}
        <div className="mt-6 w-44 mx-auto">
          <SlButton
            variant="primary"
            size="medium"
            data-optional=""
            data-valid=""
            className="w-full"
            onClick={props.continueEditingLink}
          >
            Go back to editing
          </SlButton>{" "}
          <p
            className="text-blue-500 text-xs cursor-pointer underline w-full text-center mt-4"
            onClick={props.proceedWithoutConnectingDevice}
          >
            Proceed without devices
          </p>
        </div>
      </div>
    </SlDialog>
  );
}

export default NoConnectedDeviceWarning;
