import NewLink from ".";

import Layout from "@/components/layouts/private";

import { createUrlAction } from "@/lib/actions/link";

import { retrieveDevices } from "@/lib/actions/user";

async function NewLinkPage(props: { params: { slug: string } }) {
  //const integrationsResponse = await retrieveIntegrations();
  // const integrations  = integrationsResponse instanceof Error || integrationsResponse == null ? [] : integrationsResponse;
  const devicesResponse = await retrieveDevices();
  const devices =
    devicesResponse instanceof Error || devicesResponse == null
      ? []
      : devicesResponse;
  const isProduction = process.env.NODE_ENV == "production";
  return (
    <Layout page="pages" sidebar={true} notifications={true}>
      <NewLink
        domain={
          isProduction ? process.env.FRONTEND_URL! : process.env.LOCAL_FRONTEND_URL!
        }
        hasDevices={devices.length > 0}
        devices={devices}
        // integrations={integrations}
        createUrlAction={createUrlAction}
      />
    </Layout>
  );
}

export default NewLinkPage;
