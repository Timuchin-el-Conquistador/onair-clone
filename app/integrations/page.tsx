import Layout from "@/components/layouts/private";
import Integrations from ".";

import { retrieveIntegrations } from "@/lib/actions/user";

async function IntegrationsPage() {
  const response = await retrieveIntegrations();
  const integrations =
  response instanceof Error ||
  response == null
      ? []
      : response;


  return (
    <Layout page="integrations" sidebar={true} notifications={true}>
      <Integrations
        integrations={integrations}
      />
    </Layout>
  );
}

export default IntegrationsPage;
