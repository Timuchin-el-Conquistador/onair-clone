"use client";

import Card from "@/components/cards";

import "@/styles/dashboard.scss";

import { type  ExtendedLink } from "@/lib/types/links";


type  DashboardPageLinkType = Omit<ExtendedLink, "callStrategy" | "settings">
type PageProps = {
  links: DashboardPageLinkType[];

};

function Dashboard(props: PageProps) {

  return (
    <div id="pages-grid" className="index-card-grid">
      {props.links.map((link) => (
        <Card
          key={link._id}
          slug={link.slug}
          availability={link.availability}
          linkName={link.linkName}
          integrations={link.integrations}
          timeLength={link.timeLength}
          hasConnectedDevice={link.connectedDevices.length>0}

        />
      ))}
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
                  {props.links.length} / 10
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
