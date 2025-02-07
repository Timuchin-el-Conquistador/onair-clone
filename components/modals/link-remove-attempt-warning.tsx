"use client";

import dynamic from "next/dynamic";

import "@/styles/integrations/device.scss";

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
  attemptingToDeleteSession: boolean;
  proceedDeletingSession: () => void;
  cancel: () => void;
};

function DeletingLintWarning(props: ComponentProps) {
  return (
    <SlDialog
      no-header=""
      label=""
      className="dialog-overview"
      open={props.attemptingToDeleteSession}
      onSlAfterHide={props.cancel}
    >
      <div className="p-2">
        <div className="flex items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-700">
            Delete Link
          </h2>
        </div>{" "}
        <p className="text-gray-700 mt-2">
        Are you sure? All call records associated with this link will be permanently deleted. This operation is not reversible. 
        </p>{" "}
        <div className="flex justify-between mt-8">
          <SlButton
            slot="footer"
            variant="default"
            size="medium"
            data-optional=""
            data-valid=""
            className="text-sm sm:text-base mr-4"
            onClick={props.cancel}
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
            onClick={props.proceedDeletingSession}
          >
            Confirm
          </SlButton>
        </div>
      </div>
    </SlDialog>
  );
}

export default DeletingLintWarning;
