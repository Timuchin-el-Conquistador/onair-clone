import NewLink from ".";

import Layout from "@/components/layouts/Layout";

import { retrieveIntegrations, retrieveConnectedDevices, createUrlAction } from "@/lib/actions/link";

async function NewLinkPage(props: { params: { slug: string } }) {
 
    const integrationsResponse = await retrieveIntegrations();
    const integrations  = integrationsResponse instanceof Error || integrationsResponse == null ? [] : integrationsResponse;
    const connectedDevicesResponse =  await retrieveConnectedDevices();
    const connectedDevices  = connectedDevicesResponse instanceof Error || connectedDevicesResponse == null ? [] : connectedDevicesResponse;


  return (
    <Layout page={`pages/edit`}>
      <NewLink
         hasConnectedDevices={connectedDevices.length>0}
         connectedDevices={connectedDevices}
         integrations={integrations}
         createUrlAction={createUrlAction}
      />
    </Layout>
  );
}

export default NewLinkPage;
