import Image from "next/image";

import dynamic from "next/dynamic";

import { useRef, useState, useEffect } from "react";

import { type Integration as IIntegration } from "@/lib/types/integration";

import Agents from "../modals/agents";

import { selectAgentAvatarAction } from "@/lib/actions/user";

const SlRelativeTime = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/relative-time/index.js"),
  {
    //  loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const SlTooltip = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/tooltip/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);

type ComponentProps = {
  removeIntegration: (integrationId: string) => void;
  setOnboardingState: (integrationId: string) => void;
  integration: IIntegration;
};

function Integration(props: ComponentProps) {

  const [isDropdownVisible, setDropDownVisibility] = useState(false);

  const [isAgentsModalVisible, setAgentsModalVisibility] = useState(false);

  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      elementRef.current &&
      !elementRef.current.contains(event.target as Node)
    ) {
      setDropDownVisibility(false); // Close or perform an action
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

  // Step 1: Remove the ordinal suffix (e.g., "nd")

  const cleanedDateString = props.integration.createdOn.replace(
    /(\d+)(st|nd|rd|th)/,
    "$1"
  );

  // Step 2: Parse the date
  const date = new Date(cleanedDateString);

  // Step 3: Convert to ISO 8601 format
  const isoDate = date.toISOString();
  //const isoDate= moment(call.callStartedTime).toISOString();
  return (
        <>
    <div className="index-card item-overflow-visible relative">
      {" "}
      <Image
        src="/shopify.jpg"
        width={100}
        height={100}
        alt="shopify integration"
        className="mt-1 h-full w-full object-cover"
      />{" "}
      <div className="index-card-header relative">
        <h4 className="w-full truncate">Shopify</h4>{" "}
        <h3 className="w-full truncate"> {props.integration.name}</h3>{" "}
        <div className="index-card-top-right"></div>
      </div>{" "}
      <div className="flex items-center col-span-3"></div>{" "}
      <div className="col-span-2">
        <div className="mt-6">
          <div className="text-sm text-gray-400">Status</div>{" "}
          <div className="text-sm">{props.integration.status}</div>
        </div>{" "}
        <div className="mt-6">
          <div className="text-sm text-gray-400">Created</div>{" "}
          <div className="text-sm">
            <SlTooltip
              content="Jan 24, 2025 @ 11:31pm"
              placement="bottom"
              className="text-sm"
            >
              <div className="cursor-pointer w-fit">
                <SlRelativeTime date={isoDate} />
              </div>
            </SlTooltip>
          </div>
        </div>
        <div className="mt-6">
          <div className="text-sm text-gray-400">Store</div>{" "}
          <div className="text-sm">{props.integration.name}</div>
        </div>{" "}
      </div>{" "}
      <div className="index-card-footer">
        <div className="w-full">
          <button
            className="index-card-footer-button full-button"
            onClick={() => setDropDownVisibility((state) => !state)}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="#222"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              id=""
              style={{ display: "inline-block" }}
            >
              <use xlinkHref="/feather-sprite.svg#settings"></use>
            </svg>{" "}
            <div className="inline-block">Settings</div>
          </button>
        </div>{" "}
          {isDropdownVisible && (
            <div
              ref={elementRef}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
              className="expandable-section-menu bg-white divide-y divide-gray-100 focus:outline-none"
              style={{ bottom: "-28%" }}
            >
              <div role="none" className="py-1">
                <button
                  role="menuitem"
                  className="expandable-section-menu-item w-full text-left"
                  onClick={() => {
                    setAgentsModalVisibility(true);
                    setDropDownVisibility(false); // Close or perform an action
                  }}
                >
                  Agent
                </button>
              </div>
             <div role="none" className="py-1">
                <button
                  role="menuitem"
                  className="expandable-section-menu-item w-full text-left"
                  onClick={() => {
                    setDropDownVisibility(false); // Close or perform an action
                    props.setOnboardingState(props.integration._id)
                  }}
                >
                  Onboarding
                </button>
              </div>
              {/*<div role="none" className="py-1">
                <button
                  role="menuitem"
                  className="expandable-section-menu-item delete-button w-full text-left"
                  onClick={() => {
                    props.removeIntegration(props.integration._id);
                    setDropDownVisibility(false); // Close or perform an action
                  }}
                >
                  Delete
                </button>
              </div>*/}
            </div>
          )}
      </div>
    </div>
          <Agents
        isOpen={isAgentsModalVisible}
        closeModal={() => setAgentsModalVisibility(false)}
        useAvatar={(presenterId, driverId, voice) => {
          setAgentsModalVisibility(false)
          selectAgentAvatarAction(
            props.integration._id,
            presenterId,
            driverId,
            voice
          );
        }}
      />
      </>
  );
}

export default Integration;
