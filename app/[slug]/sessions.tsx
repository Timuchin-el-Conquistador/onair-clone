"use client";

import dynamic from "next/dynamic";

import { useState, useEffect, useRef } from "react";

import "@/styles/calls/sessions.scss";
import Table from "@/components/Tables/sessions";
import Pulse from "@/components/Loaders/pulse";

import { useRouter } from "next/navigation";

import { useSessionStore } from "@/providers/session";

import { socket } from "@/utils/socket";
import useSession from "@/hooks/useSession";
import { ExtendedLink } from "@/lib/types/links";

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

type PageProps = {
  domain: string;
  slug: string;
  url: ExtendedLink;
};

function Sessions(props: PageProps) {
  const router = useRouter();
  const { session, goOffline, goOnline } = useSession({ ...props.url });

  const { sessions, error, loaded, message, retrieveActiveSessions, removeSession } =
    useSessionStore((state) => state);

  const [isDropdownVisible, setDropdownVisibility] = useState(false);

  const [drawer, setDrawerState] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({
    isOpen: false,
    id: null,
  });

  const elementRef = useRef<HTMLUListElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      elementRef.current &&
      !elementRef.current.contains(event.target as Node)
    ) {
      setDropdownVisibility(false); // Close or perform an action
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks
    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    retrieveActiveSessions(props.slug, router);
  }, []);

  const viewSession = drawer.isOpen
    ? sessions.filter((el) => el._id == drawer.id)[0]
    : null;

  return (
    <div id="main" className="mt-0 sm:mt-0 relative p-6">
      <div
        id="controls"
        className="flex items-center justify-between w-full mb-4"
      >
        <div title="Edit this page" className="inline-block text-gray-400">
          <a href={`/pages/edit/${props.slug}`}>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="#AAA"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              id=""
              style={{ display: "inline-block" }}
            >
              <use xlinkHref="/feather-sprite.svg#edit"></use>
            </svg>
          </a>
        </div>{" "}
        <div className="text-right md:text-center">
          <div className="flex items-center relative w-40">
            <div
              className="status-select h-8"
              style={{ maxWidth: "100%", width: "100%" }}
            >
              <div className="relative h-full">
                <button
                  type="button"
                  className="relative w-full rounded-md bg-white py-1 lg:py-1.5 pl-3 pr-10 text-left text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 !leading-6 sm:text-sm h-full cursor-pointer"
                  onClick={() => {
                    setDropdownVisibility(true);
                  }}
                >
                  <span className="flex items-center">
                    <span
                      className={`status-dot ${session.link.availability} mr-3`}
                    ></span>{" "}
                    <span className="text-gray-600 leading-none text-xs">
                      {session.link.availability == "online"
                        ? "Online"
                        : "Offline"}
                    </span>
                  </span>{" "}
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                    {" "}
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
                {isDropdownVisible && (
                  <ul
                    tabIndex={-1}
                    role="listbox"
                    className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm py-1"
                    style={{ maxHeight: "225px" }}
                    ref={elementRef}
                  >
                    <li
                      id="option1"
                      role="option"
                      className="relative flex items-center select-none py-2 pr-4 hover:bg-gray-100 text-gray-900 cursor-pointer pl-3"
                      style={{ fontSize: "12px" }}
                      onClick={() => {
                        goOnline();
                        setDropdownVisibility(false);
                        socket.emit('go-online', {slug:props.slug})
                      }}
                    >
                      <span className="status-dot online mr-3"></span>{" "}
                      <span className="block truncate"> Online</span>{" "}
                    </li>
                    <li
                      id="option2"
                      role="option"
                      className="relative flex items-center select-none py-2 pr-4 hover:bg-gray-100 text-gray-900 cursor-pointer pl-3"
                      style={{ fontSize: "12px" }}    
                      onClick={() => {
                        goOffline();
                        setDropdownVisibility(false);
                        socket.emit('go-offline', {slug:props.slug})
                      }}
                    >
                      <span className="status-dot offline mr-3"></span>{" "}
                      <span className="block truncate"> Offline</span>{" "}
                    </li>
                    {/*}  <li
                    id="option3"
                    role="option"
                    className="relative flex items-center select-none py-2 pr-4 hover:bg-gray-100 text-gray-900 cursor-pointer pl-3"
                    style={{ fontSize: "12px" }}
                  >
                    <span className="status-dot auto mr-3"></span>{" "}
                    <span className="block truncate">Scheduled</span>{" "}
                  </li>*/}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {!loaded && <Pulse />}
      {loaded && sessions.length > 0 && (
        <Table
          sessions={sessions}
          openDrawer={(id: string) => {
            setDrawerState((prevState) => ({
              ...prevState,
              isOpen: true,
              id,
            }));
          }}
        />
      )}


      {loaded && !sessions.length && (
        <div id="no-sessions">
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
            </svg>
            <br />
            <br />
            Share link to receive new calls
            <br />{" "}
            <small>
              <a href={props.domain + "/" + props.slug}>
                {props.domain + "/" + props.slug}
              </a>
            </small>
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
                window.open(`/session/${props.slug}/${viewSession!._id}`, '_blank');
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
                removeSession(viewSession!._id )
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

export default Sessions;
