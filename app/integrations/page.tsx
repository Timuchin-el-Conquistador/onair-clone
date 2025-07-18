
import Integrations from ".";

import {retrieveIntegrationsActions, removeIntegration } from "@/lib/actions/user";
import { retrieveSession } from "@/lib/session";
import { type Session } from "@/lib/types/user";


import InternalServerError from "@/components/Presentational/500";
import Layout from "@/components/layouts/private";



async function IntegrationsPage() {


  const session = await retrieveSession() as Session;
  if (session == null) {
      return <InternalServerError/>
  }


  return (
    <Layout page="integrations" sidebar={true} notifications={true}>
      <Integrations
           retrieveIntegrationsActions={retrieveIntegrationsActions}
           removeIntegration={removeIntegration}
        monthlyIntegrationsCapacity={session.monthlyIntegrationsCapacity as number}
        planName={session.planName}
      />
    </Layout>
  );
}

export default IntegrationsPage;
