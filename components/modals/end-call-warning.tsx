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
    // loading: () => <>Loading...</>,
    ssr: false,
  }
);


type Componentprops = {
    isOpen:boolean,
    closeModal:() => void
    endCallSession:() => void
}

function AttemptingToEndActiveSessionWarning(props:Componentprops) {
  return (
    <SlDialog
    label=""
    className="dialog-overview with-header"
    open={props.isOpen}
    onSlAfterHide={props.closeModal}
    noHeader
  >
    <div className="p-2">
      <div className="flex items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-700">End call?</h2>
      </div>{" "}
      <p className="text-gray-700 mt-2">
        Do you want to end the call? You will need to start a new call to
        reconnect.
      </p>{" "}
      <div className="flex justify-between mt-8">
        <SlButton
          slot="footer"
          variant="default"
          size="medium"
          data-optional=""
          data-valid=""
          className="text-sm sm:text-base mr-4"
          onClick={props.closeModal}
        >
          Cancel
        </SlButton>{" "}
        <SlButton
          slot="footer"
          variant="danger"
          size="medium"
          data-optional=""
          data-valid=""
          className="text-sm sm:text-base"
          onClick={props.endCallSession}
        >
          Confirm
        </SlButton>
      </div>
    </div>
    </SlDialog>
  );
}




export default AttemptingToEndActiveSessionWarning