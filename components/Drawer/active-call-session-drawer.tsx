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
  caller: Caller | null;
  monthlyMinutesCapacityReached: boolean;
  callAnsweredBy: string; //user fullname
  callStatus: string;
  user:string
  closeDrawer: () => void;
  declineCall:(user:string,callId:string) => void
  joinSession:(user:string,callId:string) => void
  endSession:(callId:string) => void
};

function ActiveCallSessionDrawer(props: ComponentProps) {
  const firstName = props.callAnsweredBy.split(" ")[0];
  const lastName = props.callAnsweredBy.split(" ")[1];
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
          <small>
            {props.caller?.info.browser}, {props.caller?.info.operatingSystem},{" "}
            {props.caller?.info.device}
          </small>
        </div>{" "}
        <hr className="my-4" />{" "}
        {props.callStatus == 'live' &&  <div>
          <hr className="my-4" />{" "}
          <div className="flex items-center">
            <span className="w-10 h-10 bg-blue-600 text-white flex justify-center items-center rounded-full text-lg font-medium mr-2">
              {firstName.split("")[0]}
              {lastName.split("")[0]}
            </span>{" "}
            <div>
              <div className="flex items-center text-xs text-gray-500">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  id=""
                  className="h-3 w-3 !text-green-600 mr-1"
                  style={{ display: "inline-block" }}
                >
                  <use xlinkHref="/feather-sprite.svg#phone-call"></use>
                </svg>
                Answered by
              </div>{" "}
              <p className="font-medium text-gray-800">{props.callAnsweredBy}</p>
            </div>
          </div>
        </div>}
        <hr className="my-4" />{" "}
        <div>
          <SlButton
            size="medium"
            variant="success"
            data-optional=""
            data-valid=""
            className="mt-4 block animation-pulse"
            onClick={() => {
  
              if (!props.monthlyMinutesCapacityReached) {

                socket.emit("answer", {
                  callId: props.sessionId,
                  user: props.user,
                });
              }
              window.open(
                `/session/${props.slug}/${props.sessionId}`,
                "_blank"
              );

              props.joinSession(props.user,props.sessionId);
              props.closeDrawer()
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
     

                socket.emit("decline", {
                  user: props.user,
                  callId: props.sessionId,
                });
                props.declineCall(props.user,props.sessionId);
                props.closeDrawer()
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
