import Layout from "@/components/layouts/private";
import Integrations from ".";

import { retrieveDevices } from "@/lib/actions/user";

async function IntegrationsPage() {
  const response = await retrieveDevices();
  const devices =
  response instanceof Error ||
  response == null
      ? []
      : response;


  return (
    <Layout page="integrations">
      <Integrations
        devices={devices}
      />
    </Layout>
  );
}

export default IntegrationsPage;
