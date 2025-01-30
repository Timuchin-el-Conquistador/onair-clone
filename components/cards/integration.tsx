import Image from "next/image";

import dynamic from "next/dynamic";

import { useRef, useState,useEffect } from "react";

import Link from "next/link"

import { type Integration as IIntegration } from "@/lib/types//user";

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

type PageProps = {

  integration:IIntegration
}


function Integration(props:PageProps) {
      const [isDropdownVisible, setDropDownVisibility] = useState(false);
    
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
          
               const cleanedDateString = props.integration.lastLogin.replace(
                /(\d+)(st|nd|rd|th)/,
                "$1"
              );

              // Step 2: Parse the date
              const date = new Date(cleanedDateString);

              // Step 3: Convert to ISO 8601 format
              const isoDate = date.toISOString();
              //const isoDate= moment(call.callStartedTime).toISOString();
  return (
    <div className="index-card item-overflow-visible relative">
      {" "}
      <Image
        src="/external-logos/mobile.svg"
        width={30}
        height={0}
        alt="device integration"
        className="mt-1"
      />{" "}
      <div className="index-card-header relative">
        <h4 className="w-full truncate">Mobile</h4>{" "}
        <h3 className="w-full truncate"> {props.integration.name}</h3>{" "}
        <div className="index-card-top-right"></div>
      </div>{" "}
      <div className="flex items-center col-span-3"></div>{" "}
      <div className="col-span-2">
        <div className="mt-6">
          <div className="text-sm text-gray-400">Status</div>{" "}
          <div className="text-sm">Active</div>
        </div>{" "}
        <div className="mt-6">
          <div className="text-sm text-gray-400">Logs</div>{" "}
          <div className="text-sm">
            <SlTooltip
              content="Jan 24, 2025 @ 11:31pm"
              placement="bottom"
              className="text-sm"
            >
              <div className="cursor-pointer w-fit">
            Last seen  <SlRelativeTime date={isoDate} />
              </div>
            </SlTooltip>
          </div>
        </div>
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
            style={{bottom: '-15%'}}
          >
            <div role="none" className="py-1">
              <Link
                href={`/integrations/update/${props.integration._id}`}
                role="menuitem"
                className="expandable-section-menu-item"
              >
                Edit
              </Link>
            </div>{" "}

      
          </div>
        )}
      </div>
    </div>
  );
}


export default Integration