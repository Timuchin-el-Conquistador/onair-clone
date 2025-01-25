import NewLink from ".";

import Layout from "@/components/layouts/private";

import {  createUrlAction } from "@/lib/actions/link";

import { retrieveDevices } from "@/lib/actions/user";

async function NewLinkPage(props: { params: { slug: string } }) {
 
    //const integrationsResponse = await retrieveIntegrations();
   // const integrations  = integrationsResponse instanceof Error || integrationsResponse == null ? [] : integrationsResponse;
    const devicesResponse =  await retrieveDevices();
    const devices  = devicesResponse instanceof Error || devicesResponse == null ? [] : devicesResponse;


  return (
    <Layout page={`pages/edit`}>
      <NewLink

         hasDevices={devices.length>0}
         devices={devices}
        // integrations={integrations}
         createUrlAction={createUrlAction}
      />
    </Layout>
  );
}

export default NewLinkPage;
