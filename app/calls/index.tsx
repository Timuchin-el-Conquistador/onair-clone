"use client";
import dynamic from "next/dynamic";

import Pulse from "@/components/Loaders/pulse";
import Table from "@/components/Tables/calls";

import { useVisibility } from "@/hooks/alerts-visibility";

import { useSessionStore } from "@/providers/session";

import { Call } from "@/lib/types/call";

import "@/styles/calls/index.scss";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { socket } from "@/utils/socket";

const SlAlert = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/alert/index.js"),
  {
    //  loading: () => <>Loading...</>,
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

const SlButton = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/button/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);
const SlDrawer = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/drawer/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);

type PageProps = {
  calls: Call[];
};

function Calls(props: PageProps) {
  const router = useRouter();
  const { reset, error, loaded, success, pullSession } = useSessionStore(
    (state) => state
  );

  const [sessions, setSessions] = useState(props.calls);
  const [drawer, setDrawerState] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({
    isOpen: false,
    id: null, //call id
  });

  const { isDangerAlertVisible, isSuccessAlertVisible } = useVisibility(
    reset,
    error,
    !loaded,
    success
  );

  const viewSession = drawer.isOpen
    ? sessions.filter((el) => el._id == drawer.id)[0]
    : null;
  return (
    <div id="main" className="mt-0 sm:mt-0 relative p-6">
      <div
        style={{
          position: "fixed",
          right: "15px",
          top: "15px",
          display: isSuccessAlertVisible ? "block" : "hidden",
        }}
      >
        <SlAlert variant="primary" open={isSuccessAlertVisible}>
          <SlIcon slot="icon" name="info-circle"></SlIcon>
          <strong>{success}</strong>
        </SlAlert>
      </div>

      <div
        style={{
          position: "fixed",
          right: "15px",
          top: "15px",
          display: isDangerAlertVisible ? "block" : "hidden",
        }}
      >
        <SlAlert variant="danger" open={isDangerAlertVisible}>
          <SlIcon slot="icon" name="exclamation-octagon"></SlIcon>
          <strong>{error?.message}</strong>
        </SlAlert>
      </div>
      {/*} <div className="mb-4">
        <div className="block lg:flex lg:justify-between lg:items-center w-full">
          <div className="mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search by visitor's email or name..."
              className="w-full sm:w-80 h-9 text-sm shadow-sm"
            />
          </div>{" "}
          <div className="block sm:flex items-center">
            <div className="mb-4 sm:mb-0">
              <div
                className="!w-full !max-w-full sm:!w-48 sm:!max-w-xs sm:!text-sm h-9"
                style={{ maxWidth: "300px", width: "300px" }}
              >
                {" "}
                <div className="relative h-full">
                  <button
                    type="button"
                    className="relative w-full rounded-md bg-white py-1 lg:py-1.5 pl-3 pr-10 text-left text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 !leading-6 sm:text-sm h-full cursor-pointer shadow-sm"
                  >
                    <div
                      className="truncate text-gray-600"
                      style={{ fontSize: "14px" }}
                    >
                      All Links
                    </div>{" "}
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-600"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </button>{" "}
                </div>
              </div>
            </div>{" "}
            <div className="ml-0 sm:ml-2">
              <div className="relative inline-block text-left m-0 md:ml-2">
                <button className="flex justify-center items-center rounded-md bg-white py-1.5 px-3 text-gray-900 focus:outline-none ring-1 ring-inset ring-gray-300 hover:bg-gray-50 shadow-sm">
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    id=""
                    className="h-6 w-6"
                    style={{ display: "inline-block" }}
                  >
                    <use xlinkHref="/feather-sprite.svg#menu"></use>
                  </svg>
                </button>{" "}
                <div
                  className="absolute mt-1 sm:right-0 z-10 w-56 origin-top-right rounded-t-none rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  style={{ display: "none" }}
                >
                  <div className="py-1">
                    <a
                      href="#"
                      className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Download Records
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>*/}
      {false && <Pulse />}

      {props.calls.length > 0 ? (
        <Table
          calls={sessions}
          openSession={(sessionId) => {
            console.log(sessionId);
            router.push(`/calls/${sessionId}`);
          }}
          openDrawer={(id: string) => {
            setDrawerState((prevState) => ({
              ...prevState,
              isOpen: true,
              id,
            }));
          }}
        />
      ) : (
        <div className="dotted-container sm:h-80 mt-4 py-12 px-6">
          <div className="text-gray-400">
            <svg
              width="45"
              height="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              id=""
              style={{ display: "inline-block" }}
            >
              <use xlinkHref="/feather-sprite.svg#coffee"></use>
            </svg>{" "}
            <h2 className="text-l mt-4 sm:mt-6 text-gray-400">Nothing Found</h2>{" "}
            {/*<h3 className="text-sm mt-2 text-gray-400">
              Clear search field or page filter
            </h3>*/}
          </div>
        </div>
      )}

      <SlDrawer
        no-header=""
        label=""
        placement="end"
        className="drawer-overview"
        open={drawer.isOpen}
        onSlAfterHide={() =>
          setDrawerState((prevState) => ({
            ...prevState,
            isOpen: false,
          }))
        }
      >
        <div>
          <div className="mt-4 text-gray-500 text-sm">Name</div>{" "}
          <div>{viewSession?.callerInfo.fullName}</div>{" "}
          <div className="mt-4">
            <div className="text-gray-500 text-sm">Email</div>{" "}
            <div>{viewSession?.callerInfo.email}</div>
          </div>{" "}
          <div className="mt-4">
            <div className="mt-4 text-gray-500 text-sm">Waiting</div>{" "}
            <div>a few seconds ago</div>
          </div>{" "}
          <div className="mt-4 text-gray-500 text-sm">Info</div>{" "}
          <div>
            Azerbaijan 🇦🇿
            <br />
            <small>Windows, Chrome/131</small>
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
                setDrawerState((prevState) => ({
                  ...prevState,
                  isOpen: false,
                }));
                socket.emit("answer", { callId: viewSession!._id });
                //router.replace(`/session/${props.slug}/${viewSession!._id}`);
                window.open(
                  `/session/${viewSession!.slug}/${viewSession!._id}`,
                  "_blank"
                );

                setSessions((prevState) =>
                  prevState.filter((el) => el._id != viewSession?._id)
                );
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
                setDrawerState((prevState) => ({
                  ...prevState,
                  isOpen: false,
                }));
                socket.emit("decline", { callId: viewSession!._id });
                pullSession(viewSession!._id);

                setSessions((prevState) =>
                  prevState.filter((el) => el._id != viewSession?._id)
                );
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
                setDrawerState((prevState) => ({
                  ...prevState,
                  isOpen: false,
                }));
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
    </div>
  );
}

export default Calls;
