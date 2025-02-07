"use client";

import dynamic from "next/dynamic";

import { socket } from "@/utils/socket";

import { type Caller } from "@/lib/types/call";

const SlButton = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/button/index.js"),
  {
    //loading: () => <>Loading...</>,
    ssr: false,
  }
);

const SlDrawer = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/drawer/index.js"),
  {
    // loading: () => <>Loading...</>,
    ssr: false,
  }
);

const SlIcon = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/icon/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);
const SlRelativeTime = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/relative-time/index.js"),
  {
    //  loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

type ComponentProps = {
  isOpen: boolean;
  sessionId: string;
  slug: string;
  callStartedTime: string;
  caller: Caller|null;
  closeDrawer: () => void;
  declineCall:(sessionId:string) => void
};

function ActiveCallSessionDrawer(props: ComponentProps) {

  return (
    <SlDrawer
      noHeader
      placement="end"
      className="drawer-overview"
      open={props.isOpen}
      onSlAfterHide={props.closeDrawer}
    >
      <div>
        <div className="mt-4 text-gray-500 text-sm">Name</div>{" "}
        <div>{props.caller?.fullName}</div>{" "}
        <div className="mt-4">
          <div className="text-gray-500 text-sm">Email</div>{" "}
          <div>{props.caller?.email}</div>
        </div>{" "}
        <div className="mt-4">
          <div className="mt-4 text-gray-500 text-sm">Waiting</div>{" "}
          <div>
            <SlRelativeTime date={props.callStartedTime} />{" "}
          </div>
        </div>{" "}
        <div className="mt-4 text-gray-500 text-sm">Info</div>{" "}
        <div>
          {props.caller?.country}, {props.caller?.countryCode}
          <br />
          <small>
            {props.caller?.info.browser}, {props.caller?.info.operatingSystem},{" "}
            {props.caller?.info.device}
          </small>
        </div>{" "}
        <hr className="my-4" />{" "}
        <div>
          <SlButton
            size="medium"
            variant="success"
            data-optional=""
            data-valid=""
            className="mt-4 block animation-pulse"
            onClick={() => {
              props.closeDrawer();
              socket.emit("answer", { callId: props.sessionId });
              window.open(`/session/${props.slug}/${props.sessionId}`, "_blank");

            }}
          >
            Join Call
          </SlButton>{" "}
          <SlButton
            size="medium"
            variant="warning"
            outline
            data-optional=""
            className="mt-4 block"
            data-valid=""
            data-user-valid=""
            onClick={() => {
              props.closeDrawer();
              socket.emit("decline", { callId: props.sessionId });
              props.declineCall(props.sessionId)
            }}
          >
            <div>End Call</div>
          </SlButton>
        </div>
      </div>{" "}
      <div slot="footer" className="flex justify-between">
        <span>
          <SlButton
            variant="text"
            size="medium"
            data-optional=""
            data-valid=""
            onClick={() => {
              props.closeDrawer();
            }}
          >
            <SlIcon
              name="arrow-left"
              aria-hidden="true"
              library="default"
            ></SlIcon>{" "}
            Back
          </SlButton>
        </span>{" "}
      </div>
    </SlDrawer>
  );
}

export default ActiveCallSessionDrawer;
