"use client";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import Link from "next/link";

import Card from "@/components/cards/integration";
import MaximumLimitReached from "@/components/modals/maximum-limit-reached";

import "@/styles/dashboard.scss";

import { type Integration } from "@/lib/types/user";

type PageProps = {
  integrations: Integration[];
  monthlyIntegrationsCapacity: number;
  planName: string;
};

function Integrations(props: PageProps) {
  const [maxLimitReached, setMaxLimitReached] = useState(false);

  const integrationsLength = useMemo(() => props.integrations.length, [props.integrations]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (integrationsLength == props.monthlyIntegrationsCapacity) {
        e.preventDefault(); // Stop navigation
        setMaxLimitReached(true);
      }
    },
    [integrationsLength, props.monthlyIntegrationsCapacity] // Recreates only when shouldRedirect changes
  );

  return (
    <div id="pages-grid" className="index-card-grid">
      {props.integrations.map((integration) => (
        <Fragment key={integration._id}>
          <Card integration={integration} />
        </Fragment>
      ))}
      <div className="index-card bordered"     style={{
          overflow: "visible",
          position: "relative",
        }}>
        <div className="p-6">
          <h4 className="text-lg font-bold">New Integration </h4>{" "}
          <div className="mt-6">
            Click on the button below to create a new integration.
            <br />
            <br />{" "}
            <div id="tooltip" className="sp-tooltip">
              <div className="sp-tooltip-element">
                <span className="bg-white flex justify-center border text-sm text-center px-2 rounded-2xl w-16 m-auto items-center text-gray-400">
                  {integrationsLength} / {props.monthlyIntegrationsCapacity}
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
                    You have ({integrationsLength}) integrations. Your
                    subscription plan allows up to (
                    {props.monthlyIntegrationsCapacity}) integrations.
                    <br />
                    <br />
                    To increase your integrations limit, upgrade your
                    subscription plan from Dashboard &gt; Billing.
                  </div>
                </div>
              </div>
            </div>

          </div>{" "}
          <Link
            href="/integrations/new"
            className="block btn btn-blue mt-8"
            onClick={handleClick}
          >
            New Integration
          </Link>
        </div>
      </div>

      <MaximumLimitReached
        subscriptionFeature="Integrations"
        subscriptionPlan={props.planName}
        isOpen={maxLimitReached}
        closeModal={() => {
          setMaxLimitReached(false);
        }}
      />
    </div>
  );
}

export default Integrations;
