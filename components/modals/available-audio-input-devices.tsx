'use client'

import dynamic from "next/dynamic";

const SlButton = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/button/index.js"),
  {
    // loading: () => <>Loading...</>,
    ssr: false,
  }
);

const SlDialog = dynamic(
  // Notice how we use the full path to the component. If you only do `import("@shoelace-style/shoelace/dist/react")` you will load the entire component library and not get tree shaking.
  () => import("@shoelace-style/shoelace/dist/react/dialog/index.js"),
  {
    //  loading: () => <p>Loading...</p>,
    ssr: false,
  }
);


type ComponentProps ={
    audioInputDevicesModalVisibility:boolean,
    setAudioInputDevicesModalVisibility:(state:boolean) => void,
    audioInputDevices:MediaDeviceInfo[]
}

function AvailableAudioInputDevices(props:ComponentProps){


    return(
        <SlDialog
        label="Settings"
        className="dialog-overview with-header"
        open={props.audioInputDevicesModalVisibility}
        onSlAfterHide={() => props.setAudioInputDevicesModalVisibility(false)}
      >
        <div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm">Microphone</span>{" "}
            <select
              style={{ width: "200px", fontSize: "13px" }}
              onChange={(e) => {
                const deviceId = e.target.value;
                localStorage.setItem("audio-input-device-id", deviceId);
              }}
            >
              <option value="" disabled>
                Select Audio Device
              </option>{" "}
              {props.audioInputDevices.map((device) => (
                <option value={device.deviceId} key={device.deviceId}>
                  {device.label}
                </option>
              ))}
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
            onClick={() => props.setAudioInputDevicesModalVisibility(false)}
          >
            Close
          </SlButton>
        </div>
      </SlDialog>
    )
}



export default AvailableAudioInputDevices