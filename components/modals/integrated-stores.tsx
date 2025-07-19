"use client";

import dynamic from "next/dynamic";

import { Fragment } from "react";

import { type Integration } from "@/lib/types/integration";

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
    setIntegratedStoresModalState: (state: boolean) => void;
    unlinkStores: (deviceId: string) => void;
    linkStores: () => void;
    isIntegratedStoresModalOpen: boolean;
  checkedIntegrations: Integration[];
  integratedStores: Integration[];
  connectedStores: Integration[];
};

function IntegratedStores(props: ComponentProps) {
  return (
    <SlDialog
      label="Stores"
      className="dialog-overview with-header"
      open={props.isIntegratedStoresModalOpen}
      onSlAfterHide={() => {
        props.setIntegratedStoresModalState(false);
      }}
    >
      <div className="bg-white rounded-md border border-gray-200">
        <div className="divide-y divide-gray-200 max-h-[40vh] overflow-scroll">
          <div className="flex flex-row pl-3 py-3 hover:bg-stone-100 text-sm h-16 cursor-pointer">
            {props.integratedStores.map((store: Integration) => (
              <Fragment key={store._id}>
                <SlCheckbox
                  size="small"
                  form=""
                  data-optional=""
                  data-valid=""
                  className="mx-2 small-checkbox"
                  onSlChange={(event) => {
                    const checked = (event.target as HTMLInputElement).checked;

                    if (checked) {
                      props.checkedIntegrations.push(store);
                    } else {
                      props.unlinkStores(store._id);
                    }
                  }}
                  checked={
                    props.connectedStores.findIndex(
                      (el: Integration) => el._id == store._id
                    ) > -1
                  }
                ></SlCheckbox>{" "}
                <div className="flex flex-col w-full truncate ml-1">
                  <p className="text-gray-900 truncate font-medium">
                    {store.name}
                  </p>{" "}
                  <p className="text-gray-500 text-xs truncate items-center">
                    From
                    <span className="ml-0.5">{store.from}</span>
                  </p>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 text-sm">
        <a href="/integrations/new/shopify" target="_blank" className="text-blue-500">
          + Add Store
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
            props.setIntegratedStoresModalState(false);
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
          onClick={props.linkStores}
        >
          Save
        </SlButton>
      </div>
    </SlDialog>
  );
}

export default IntegratedStores;
