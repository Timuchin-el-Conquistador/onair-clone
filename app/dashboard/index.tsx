"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import Link from "next/link";

import "@/styles/dashboard.scss";

import Card from "@/components/cards/link";
import { CardSkeletonPulse } from "@/components/Loaders/pulse";

import { type ExtendedLink } from "@/lib/types/links";

import MaximumLimitReached from "@/components/modals/maximum-limit-reached";
import DeletingLintWarning from "@/components/modals/link-remove-attempt-warning";

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
  planName: string;
};

function Dashboard(props: PageProps) {
  const [links, setLinks] = useState<ExtendedLink[]>([]);
  const [loaded, setLoadedState] = useState(false);

  const [maxLimitReached, setMaxLimitReached] = useState(false);

  const [
    attemptingToDeleteLinkWarningModal,
    setAttemptingToDeleteLinkWarningModal,
  ] = useState({
    isOpen: false,
    slug: "",
  });

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

  const linksLength = useMemo(() => links.length, [links]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (linksLength == props.monthlyLinksCapacity) {
        e.preventDefault(); // Stop navigation
        setMaxLimitReached(true);
      }
    },
    [linksLength, props.monthlyLinksCapacity] // Recreates only when shouldRedirect changes
  );

  return (
    <div id="pages-grid" className="index-card-grid">
      {links.map((link) => (
        <Fragment key={link._id}>
          <Card
            slug={link.slug}
            availability={link.availability}
            linkName={link.linkName}
            connectedDevices={link.connectedDevices}
            stores={link.stores}
            totalCallDuration={link.totalCallDuration}
            hasConnectedDevice={link.connectedDevices.length > 0}
            removeLink={(slug) => {
              setAttemptingToDeleteLinkWarningModal({
                isOpen: true,
                slug,
              });
            }}
          />
        </Fragment>
      ))}
      {!loaded && <CardSkeletonPulse />}
      <div
        className="index-card bordered "
        style={{
          overflow: "visible",
          position: "relative",
        }}
      >
        <div className="p-6">
          <h4 className="text-lg font-bold">New Link</h4>{" "}
          <div className="mt-6">
            Create a new link to accept online calls.
            <br />
            <br />{" "}
            <div id="tooltip" className="sp-tooltip">
              <div className="sp-tooltip-element">
                <span className="bg-white flex justify-center border text-sm text-center px-2 rounded-2xl w-16 m-auto items-center text-gray-400">
                  {linksLength} / {props.monthlyLinksCapacity}
                </span>
              </div>{" "}
              <div
                className="sp-tooltip-body"
                style={{ width: "300px", left: "5px" }}
              >
                <div
                  className="sp-tooltip-arrow"
                  style={{ left: "calc(50%)" }}
                ></div>{" "}
                <div>
                  <div className="text-left">
                    You have ({linksLength}) links. Your subscription plan
                    allows up to ({props.monthlyLinksCapacity}) links.
                    <br />
                    <br />
                    To increase your links limit, upgrade your subscription plan
                    from Dashboard &gt; Billing.
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          <Link
            href="/pages/new"
            className="block btn btn-blue mt-8"
            onClick={handleClick}
          >
            New Link
          </Link>
        </div>
      </div>

      <MaximumLimitReached
        subscriptionFeature="Links"
        subscriptionPlan={props.planName}
        isOpen={maxLimitReached}
        closeModal={() => {
          setMaxLimitReached(false);
        }}
      />

      <DeletingLintWarning
        attemptingToDeleteSession={attemptingToDeleteLinkWarningModal.isOpen}
        cancel={() => {
          setAttemptingToDeleteLinkWarningModal({
            isOpen:false,
            slug:''
          });
        }}
        proceedDeletingSession={() => {
          const slug = attemptingToDeleteLinkWarningModal.slug
          setAttemptingToDeleteLinkWarningModal({
            isOpen:false,
            slug:''
          });
          props.removeLinkAction(slug);
          setLinks((prevState) => prevState.filter((el) => el.slug != slug));
        }}
      />
    </div>
  );
}

export default Dashboard;
