"use client";



import { useEffect, useState } from "react";

import ShopifyOnboarding from "@/components/onboarding";

import "@/styles/dashboard.scss";

import { type Integration } from "@/lib/types/integration";


type PageProps = {
  retrieveIntegrationsActions: () => Promise<{
    status: number;
    integrations: Integration[];
    message: string;
  }>;
  removeIntegration: (
    integrationId: string
  ) => Promise<{ status: number; message: string }>;
};

function Onboarding(props: PageProps) {
  const [integrations, setIntegrations] = useState<Integration[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setErrorMessage] = useState<string>("");
  const [success, setSuccessMesssage] = useState<string>("");


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




  return (
    <>
   {integrations.length ? <ShopifyOnboarding
      themes={[{ id: "down", name: "Down" }]}
      store={integrations[0].store.storeDomain.split('.myshopify.com')[0]}
    /> : <p></p>}
    </>
  );
}

export default Onboarding;
