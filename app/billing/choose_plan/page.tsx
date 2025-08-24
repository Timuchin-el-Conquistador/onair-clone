import Layout from "@/components/layouts/private";

import BillingPlans from ".";

import {
  retrievePlans,
  createSubscriptionSessionAction,
} from "@/lib/actions/billing";

import { retrieveStoreIntegrationAction } from "@/lib/actions/user";

async function BillingPlansPage() {
  const plansResponse = await retrievePlans();
  const plans =
    plansResponse instanceof Error || plansResponse == null
      ? []
      : plansResponse;

  const response = await retrieveStoreIntegrationAction();

  const storeIntegration =
    response instanceof Error || response == null ? null : response.integration;
    
  return (
    <Layout page="billing" sidebar={true} notifications={true}>
      <BillingPlans
        plans={plans}
        createSubscriptionSessionAction={createSubscriptionSessionAction}
        storeIntegration={storeIntegration}
      />
    </Layout>
  );
}

export default BillingPlansPage;
