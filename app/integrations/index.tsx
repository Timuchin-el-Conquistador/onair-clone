"use client";

import { Fragment, useEffect,useState } from "react";

import Link from "next/link"

import Card from "@/components/cards/integration";

import "@/styles/dashboard.scss";



import { type Integration } from "@/lib/types/user";

import { useUserStore } from "@/providers/user";
type PageProps = {
  integrations: Integration[];
};

function Integrations(props: PageProps) {

  const { subscription } = useUserStore((state) => state);
  const maxIntegrations = subscription?.integrations || 0;
  
  return (
    <div id="pages-grid" className="index-card-grid">
      {props.integrations.map((integration) => (
        <Fragment key={integration._id}>
        <Card  integration={integration}/>
        </Fragment>
      ))}
      <div className="index-card bordered">
        <div className="p-6">
          <h4 className="text-lg font-bold">New Integration </h4>{" "}
          <div className="mt-6">
          Click on the button below to create a new integration.

            <br />
            <br />{" "}
            <div id="tooltip" className="sp-tooltip">
              {" "}
              <div className="sp-tooltip-element">
                <span className="bg-white flex justify-center border text-sm text-center px-2 rounded-2xl w-16 m-auto items-center text-gray-400">
                  {props.integrations.length} / {maxIntegrations}
                </span>
              </div>{" "}
            </div>
          </div>{" "}
          <Link href="/integrations/new" className="block btn btn-blue mt-8">
            New Integration
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Integrations;
