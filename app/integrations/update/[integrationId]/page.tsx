import "@/styles/integrations/new-integration.scss";

import Layout from "@/components/layouts/private";
import Integration from "@/components/Integrations/";

import { retrieveIntegration } from "@/lib/actions/user";

async function EditDeviceIntegration(props: {
  params: { integrationId: string };
}) {
  const response = await retrieveIntegration(props.params.integrationId);
  const integration =
    response instanceof Error || response == null ? null: response;
console.log(integration)
  return (
    <Layout page="integrations" sidebar={true} notifications={true}>
      <Integration integration={integration} />
    </Layout>
  );
}

export default EditDeviceIntegration;
