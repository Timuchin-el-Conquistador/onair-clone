
import Link from "next/link"
import { useState } from "react"


import { type Link as ILink } from "@/lib/dtos/links";

type PageProps =Omit<ILink, '_id'>;


function Card(props:PageProps){

  const [menuVisibilityState, setMenyVisibilityState] = useState(false)
    return (
        <div className="index-card item-overflow-visible relative">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-1"
        >
          <circle
            cx="19"
            cy="6"
            r="3"
            fill={props.availability == 'always online' ? "#2ECC71" : "#CCCCCC"}
            strokeWidth="0"
          ></circle>{" "}
          <path d="M22 12v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9"></path>{" "}
          <path d="M12 17v4"></path> <path d="M8 21h8"></path>
        </svg>{" "}
        <div className="index-card-header relative">
          <h4 className="w-full truncate">{props.linkName}</h4>{" "}
          <h3 className="w-full truncate">{props.slug}</h3>{" "}
          <div className="index-card-top-right"></div>
        </div>{" "}
        <div className="flex items-center col-span-3"></div>{" "}
        <div className="col-span-2">
          <div className="mt-6">
            <div className="text-sm text-gray-400">Minutes</div>{" "}
            <div className="text-sm">{props.timeLength} minute</div>
          </div>{" "}
          <div className="mt-6">
            <div className="text-sm text-gray-400">Integrations</div>{" "}
            <div className="text-sm">{props.integrations.length} integration</div>
          </div>
        </div>{" "}
        <div className="index-card-footer">
          <button  className="index-card-footer-button" onClick={() =>setMenyVisibilityState(state => !state)}>
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
          </button>{" "}
          <Link href="/timuchin" className="index-card-footer-button">
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
              <use xlinkHref="/feather-sprite.svg#play"></use>
            </svg>{" "}
            <div className="inline-block">Open</div>
          </Link>{" "}
          {menuVisibilityState && <div
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            className="expandable-section-menu bg-white divide-y divide-gray-100 focus:outline-none"
          >
            <div role="none" className="py-1">
              <Link
                href={`/pages/edit/${props.slug}`}
                role="menuitem"
                className="expandable-section-menu-item"
              >
                Edit
              </Link>
            </div>{" "}
            {/*<div role="none" className="py-1">
              <Link
                href="/embed/timuchin"
                role="menuitem"
                className="expandable-section-menu-item"
              >
                Embed
              </a>
            </div>{" "}*/}
            <div role="none" className="py-1">
              <a
                role="menuitem"
                className="expandable-section-menu-item delete-button"
              >
                Delete
              </a>
            </div>
          </div>}
        </div>
      </div>
    )
}


export default Card