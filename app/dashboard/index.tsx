"use client";

import { Fragment, useEffect, useState } from "react";

import Link from "next/link";

import "@/styles/dashboard.scss";

import Card from "@/components/cards/link";
import CardPulse from "@/components/Loaders/pulse";

import { type ExtendedLink } from "@/lib/types/links";

type PageProps = {
  retrieveUrlsAction: () => Promise<{
    status: number;
    urls: ExtendedLink[];
    message: string;
  }>;
  removeLinkAction: (
    slug: string
  ) => Promise<{ status: number; message: string }>;
  monthlyLinksCapacity: number;

};

function Dashboard(props: PageProps) {
  const [links, setLinks] = useState<ExtendedLink[]>([]);
  const [loaded, setLoadedState] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await props.retrieveUrlsAction();
      if (response.status == 400) {
        setLinks([]);
        return;
      }
      setLinks(response.urls);
      setLoadedState(true);
    };
    fetchLinks();
  }, [props.retrieveUrlsAction]);

  return (
    <div id="pages-grid" className="index-card-grid">
      {links.map((link) => (
        <Fragment key={link._id}>
          <Card
            slug={link.slug}
            availability={link.availability}
            integrations={link.integrations}
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
       {!loaded && <CardPulse />}
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
                  {links.length} / {props.monthlyLinksCapacity}
                </span>
              </div>{" "}
            </div>
          </div>{" "}
          <Link href="/pages/new" className="block btn btn-blue mt-8">
            New Link
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
