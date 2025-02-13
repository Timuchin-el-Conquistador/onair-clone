"use client";

import dynamic from "next/dynamic";

import { Device } from "@/lib/types/device";

import { Fragment } from "react";

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

const SlCheckbox = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/checkbox/index.js"),
  {
    // loading: () => <>Loading...</>,
    ssr: false,
  }
);
type ComponentProps = {
  setAvailableDevicesModalState: (state: boolean) => void;
  unlinkDeviceFromUrl: (deviceId: string) => void;
  linkDevices: () => void;
  isAvailableDevicesModalOpen: boolean;
  checkedDevices: Device[];
  availableDevices: Device[];
  connectedDevices: Device[];
};
function AvailableDevices(props: ComponentProps) {
  return (
    <SlDialog
      label="Devices"
      className="dialog-overview with-header"
      open={props.isAvailableDevicesModalOpen}
      onSlAfterHide={() => {
        props.setAvailableDevicesModalState(false);
      }}
    >
      <div className="bg-white rounded-md border border-gray-200">
        <div className="divide-y divide-gray-200 max-h-[40vh] overflow-scroll">
          <div className="flex flex-row pl-3 py-3 hover:bg-stone-100 text-sm h-16 cursor-pointer">
            {props.availableDevices.map((device: Device) => (
              <Fragment key={device._id}>
                <SlCheckbox
                  size="small"
                  form=""
                  data-optional=""
                  data-valid=""
                  className="mx-2 small-checkbox"
                  onSlChange={(event) => {
                    const checked = (event.target as HTMLInputElement).checked;

                    if (checked) {
                      props.checkedDevices.push(device);
                    } else {
                      props.unlinkDeviceFromUrl(device._id);
                    }
                  }}
                  checked={
                    props.connectedDevices.findIndex(
                      (el: Device) => el._id == device._id
                    ) > -1
                  }
                ></SlCheckbox>{" "}
                <div className="flex flex-col w-full truncate ml-1">
                  <p className="text-gray-900 truncate font-medium">
                    {device.ownerFullName}
                  </p>{" "}
                  <p className="text-gray-500 text-xs truncate items-center">
                    Mobile
                    <span className="ml-0.5">{device.description}</span>
                  </p>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 text-sm">
        <a href="/integrations" target="_blank" className="text-blue-500">
          + Add Device
        </a>
      </div>

      <div className="flex justify-between mt-16">
        <SlButton
          slot="footer"
          variant="default"
          size="medium"
          data-optional=""
          data-valid=""
          onClick={() => {
            props.setAvailableDevicesModalState(false);
          }}
        >
          Cancel
        </SlButton>{" "}
        <SlButton
          slot="footer"
          variant="primary"
          size="medium"
          data-optional=""
          data-valid=""
          onClick={props.linkDevices}
        >
          Save
        </SlButton>
      </div>
    </SlDialog>
  );
}

export default AvailableDevices;
