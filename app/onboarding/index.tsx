"use client";



import { useEffect, useState } from "react";

import ShopifyOnboarding from "@/components/onboarding";

import "@/styles/dashboard.scss";

import { type Integration } from "@/lib/types/integration";


type PageProps = {
  retrieveStoreIntegrationAction: () => Promise<{
    status: number;
    integration: Integration | null
    message: string;
  }>;
  removeIntegration: (
    integrationId: string
  ) => Promise<{ status: number; message: string }>;
};

function Onboarding(props: PageProps) {
  const [integration, setIntegration] = useState<Integration|null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setErrorMessage] = useState<string>("");
  const [success, setSuccessMesssage] = useState<string>("");


  useEffect(() => {
    const fetchIntegartion = async () => {
      setLoading(true);
      const response = await props.retrieveStoreIntegrationAction();
      if (response.status !== 200) {
        return;
      }
      setIntegration(response.integration);
      setLoading(false);
    };
    fetchIntegartion();
  }, []);




  return (
    <>
    {loading && <p>Loading.....</p>}
   {integration ? <ShopifyOnboarding
      themes={[{ id: "down", name: "Down" }]}
      store={integration.store.storeDomain.split('.myshopify.com')[0]}
    /> : <p></p>}
    </>
  );
}

export default Onboarding;
