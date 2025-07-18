import NewLink from ".";

import Layout from "@/components/layouts/private";

import { createUrlAction } from "@/lib/actions/link";

import { retrieveDevices,retrieveStoreIntegrations } from "@/lib/actions/user";

async function NewLinkPage() {
  //const integrationsResponse = await retrieveIntegrations();
  // const integrations  = integrationsResponse instanceof Error || integrationsResponse == null ? [] : integrationsResponse;
  const devicesResponse = await retrieveDevices();
  const devices =
    devicesResponse instanceof Error || devicesResponse == null
      ? []
      : devicesResponse;
  const retrieveShopifyStoresResponse = await retrieveStoreIntegrations();
  const stores =
    retrieveShopifyStoresResponse instanceof Error ||
    retrieveShopifyStoresResponse == null
      ? []
      : retrieveShopifyStoresResponse;

  const isProduction = process.env.NODE_ENV == "production";


 
  return (
    <Layout page="pages" sidebar={true} notifications={true}>
      <NewLink
        domain={
          isProduction
            ? process.env.FRONTEND_URL!
            : process.env.LOCAL_FRONTEND_URL!
        }
        devices={devices}
        stores={stores}
        createUrlAction={createUrlAction}
      />
    </Layout>
  );
}

export default NewLinkPage;
