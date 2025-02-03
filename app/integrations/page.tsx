import Layout from "@/components/layouts/private";
import Integrations from ".";

import { retrieveIntegrations } from "@/lib/actions/user";
import { retrieveSession } from "@/lib/session";

import { redirect } from "next/navigation";

async function IntegrationsPage() {
  const response = await retrieveIntegrations();
  const integrations =
  response instanceof Error ||
  response == null
      ? []
      : response;

  const session = await retrieveSession();
  if (session == null) {
    redirect("/404");
  }


  return (
    <Layout page="integrations" sidebar={true} notifications={true}>
      <Integrations
        integrations={integrations}
        monthlyIntegrationsCapacity={session.monthlyIntegrationsCapacity as number}
      />
    </Layout>
  );
}

export default IntegrationsPage;
