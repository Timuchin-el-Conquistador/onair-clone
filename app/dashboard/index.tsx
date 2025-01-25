"use client";

import Card from "@/components/cards/link";

import "@/styles/dashboard.scss";

import { type Link, type ExtendedLink } from "@/lib/types/links";
import { Fragment, useEffect, useState } from "react";

import Pulse from "@/components/Loaders/pulse";

type PageProps = {
  //links: ExtendedLink[];
  retrieveUrlsAction:()=> Promise<ExtendedLink[]|Error>
  removeLinkAction: (slug: string) => Promise<string | Error>;
};

function Dashboard(props: PageProps) {
  const [links, setLinks] = useState<ExtendedLink[]>([]);
  const [loaded,setLoadedState] = useState(false)

  useEffect(()=>{
    const fetchLinks  = async ()=>{
    const response = await props.retrieveUrlsAction();
    const links = response instanceof Error || response == null ? [] : response;
    setLinks(links)
    setLoadedState(true)
    }
    fetchLinks()
      
  }, [props.retrieveUrlsAction])
  return (
    <div id="pages-grid" className="index-card-grid">
      {links.map((link) => (
        <Fragment key={link._id}>
          <Card
            slug={link.slug}
            availability={link.availability}
            linkName={link.linkName}
            connectedDevices={link.connectedDevices}
            totalCallDuration={link.totalCallDuration}
            hasConnectedDevice={link.connectedDevices.length > 0}
            removeLink={(slug) => {
              props.removeLinkAction(slug);
              setLinks((prevState) =>
                prevState.filter((el) => el.slug != slug)
              );
            }}
          />
        </Fragment>
      ))}
            {!loaded && <Pulse />}
      <div className="index-card bordered">
        <div className="p-6">
          <h4 className="text-lg font-bold">New Link</h4>{" "}
          <div className="mt-6">
            Create a new link to accept online calls.
            <br />
            <br />{" "}
            <div id="tooltip" className="sp-tooltip">
              {" "}
              <div className="sp-tooltip-element">
                <span className="bg-white flex justify-center border text-sm text-center px-2 rounded-2xl w-16 m-auto items-center text-gray-400">
                  {links.length} / 10
                </span>
              </div>{" "}
            </div>
          </div>{" "}
          <a href="/pages/new" className="block btn btn-blue mt-8">
            New Link
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
