"use client";

import dynamic from "next/dynamic";

import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import Link from "next/link";

import DeviceIntegrations from "@/components/cards/device-integration";
import StoreIntegration from "@/components/cards/store-integration";
import MaximumLimitReached from "@/components/modals/maximum-limit-reached";
import { CardSkeletonPulse } from "@/components/Loaders/pulse";
import ShopifyOnboarding from "@/components/onboarding";

import "@/styles/dashboard.scss";

import { type Integration } from "@/lib/types/integration";

const SlIcon = dynamic(
  // Notice how we use the full path to the component. If you only do `import("@shoelace-style/shoelace/dist/react")` you will load the entire component library and not get tree shaking.
  () => import("@shoelace-style/shoelace/dist/react/icon/index.js"),
  {
    //   loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
const SlAlert = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/alert/index.js"),
  {
    //  loading: () => <>Loading...</>,
    ssr: false,
  }
);

type PageProps = {
  retrieveIntegrationsActions: () => Promise<{
    status: number;
    integrations: Integration[];
    message: string;
  }>;
  removeIntegration: (
    integrationId: string
  ) => Promise<{ status: number; message: string }>;
  monthlyIntegrationsCapacity: number;
  planName: string;
};

function Integrations(props: PageProps) {
  const [integrations, setIntegrations] = useState<Integration[]>([]);

  const [maxLimitReached, setMaxLimitReached] = useState(false);

  const [onboardingPageState, setOnboardingPageState] = useState({
    visibility: false,
    integrationId: "",
  });

  const [error, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccessMesssage] = useState<string>("");

  const integrationsLength = useMemo(() => integrations.length, [integrations]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (integrationsLength == props.monthlyIntegrationsCapacity) {
        e.preventDefault(); // Stop navigation
      //  setMaxLimitReached(true);
      }
    },
    [integrationsLength, props.monthlyIntegrationsCapacity] // Recreates only when shouldRedirect changes
  );

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      const response = await props.retrieveIntegrationsActions();
      if (response.status !== 200) {
        setIntegrations([]);
        return;
      }
      setIntegrations(response.integrations);
      setLoading(false);
    };
    fetchLinks();
  }, [props.retrieveIntegrationsActions]);

  const removeIntegration = async (integrationId: string) => {
    setLoading(true);
    const response = await props.removeIntegration(integrationId);

    setLoading(false);
    if (response.status !== 200) {
      setErrorMessage(response.message);

      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
      return;
    }

    setSuccessMesssage(response.message);
    setIntegrations((prevState) =>
      prevState.filter((el) => el._id != integrationId)
    );
    setTimeout(() => {
      setSuccessMesssage("");
    }, 2000);
  };


    const integrationIndex = useMemo(() => {
    return integrations.findIndex(
      (el) => el._id == onboardingPageState.integrationId
    );
  }, [onboardingPageState.integrationId]);
  return (
      <>
      {integrations.length && onboardingPageState.visibility ? (
        <ShopifyOnboarding
          themes={[{ id: "down", name: "Down" }]}
          store={integrations[integrationIndex].name}
        />
      ) : (
    <div id="pages-grid" className="index-card-grid">
      <div
        style={{
          position: "fixed",
          right: "15px",
          top: "15px",
          display: success ? "block" : "hidden",
        }}
      >
        <SlAlert variant="success" open={!!success}>
          <SlIcon slot="icon" name="info-circle"></SlIcon>
          <div className="flex items-center">
            <strong>{success}</strong>
          </div>
        </SlAlert>
      </div>
      <div
        style={{
          position: "fixed",
          right: "15px",
          top: "15px",
          display: loading ? "block" : "hidden",
        }}
      >
        <SlAlert variant="success" open={loading}>
          <SlIcon slot="icon" name="info-circle"></SlIcon>
          <div className="flex items-center">
            <strong>Removing...</strong>
          </div>
        </SlAlert>
      </div>
      <div
        style={{
          position: "fixed",
          right: "15px",
          top: "15px",
          display: error ? "block" : "hidden",
        }}
      >
        <SlAlert variant="danger" open={!!error}>
          <SlIcon slot="icon" name="info-circle"></SlIcon>
          <div className="flex items-center">
            <strong>{error}</strong>
          </div>
        </SlAlert>
      </div>
      {integrations
        .filter((el) => el.category == "mobile")
        .map((integration) => (
          <Fragment key={integration._id}>
            <DeviceIntegrations integration={integration} />
          </Fragment>
        ))}
      {integrations
        .filter((el) => el.category == "store")
        .map((integration) => (
          <Fragment key={integration._id}>
            <StoreIntegration
              integration={integration}
              removeIntegration={removeIntegration}
              setOnboardingState={(integrationId: string) =>
                setOnboardingPageState((prevState) => ({
                  visibility: !prevState.visibility,
                  integrationId,
                }))
              }
            />
          </Fragment>
        ))}
      {loading && <CardSkeletonPulse />}
      <div
        className="index-card bordered"
        style={{
          overflow: "visible",
          position: "relative",
        }}
      >
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
        )}
    </>
  );
}

export default Integrations;
