import Layout from "@/components/layouts/private";

import BillingPlans from ".";

import { retrievePlans,createSubscriptionSessionAction } from "@/lib/actions/billing";



async function BillingPlansPage() {
  const response = await retrievePlans();
  const plans = response instanceof Error || response == null ? [] : response;

  return (
    <Layout page="billing" sidebar={true} notifications={true}>
      <BillingPlans plans={plans} createSubscriptionSessionAction={createSubscriptionSessionAction}/>
    </Layout>
  );
}

export default BillingPlansPage;
