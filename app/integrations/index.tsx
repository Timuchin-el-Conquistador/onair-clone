"use client";

import Card from "@/components/cards/device";

import "@/styles/dashboard.scss";

import Link from "next/link"

import { Fragment } from "react";

import { Device } from "@/lib/types/device";

type PageProps = {
  devices: Device[];
};

function Integrations(props: PageProps) {
  return (
    <div id="pages-grid" className="index-card-grid">
      {props.devices.map((device) => (
        <Fragment key={device._id}>
        <Card  device={device}/>
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
                  {props.devices.length} / 3
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
