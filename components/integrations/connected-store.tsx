
import dynamic from "next/dynamic"

import { type Integration } from "@/lib/types/integration";

import Image from "next/image";

const SlTooltip = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/tooltip/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);


type ComponentProps = {
    removeStoreFromLink:(storeId:string) => void,
    store:Integration
}


function ConnectedStore(props:ComponentProps){


    return(
        <div
        role="alert"
        className="flex items-center pl-3 pr-2 py-1 mt-2 bg-white rounded-lg ring-1 ring-black ring-opacity-10"
      >
        <span draggable="false" className="notification-item">
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            id=""
            className="h-4 w-4 text-gray-500 mr-3"
            style={{ display: "inline-block" }}
          >
            <use xlinkHref="/feather-sprite.svg#more-vertical"></use>
          </svg>
        </span>{" "}
        <SlTooltip
          content="Cingiz Hemidov, hemidovcingiz183@gmail.com"
          style={{ maxWidth: "200px" }}
        >
          <div className="text-sm font-medium truncate flex items-center">
            <Image src={props.store.from == 'shopify' ? '/shopify.png' : ''} width={25} height={25} alt='device integration' />{" "}
            <span className="truncate ml-4">{props.store.name}</span>
          </div>
        </SlTooltip>{" "}
        <button
          type="button"
          aria-label="Close"
          className="ml-auto text-gray-500 rounded-full p-1 hover:bg-gray-50 inline-flex items-center justify-center h-8 w-8"
          onClick={() => props.removeStoreFromLink(props.store._id)}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            id=""
            className="h-4 w-4 text-gray-500"
            style={{ display: "inline-block" }}
          >
            <use xlinkHref="/feather-sprite.svg#x"></use>
          </svg>
        </button>
      </div>
    )
}



export default ConnectedStore
