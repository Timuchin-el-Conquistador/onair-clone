import Layout from "@/components/layouts/private";

import Billing from ".";

import { retrieveSubscription } from "@/lib/actions/billing";

async function BillingPage() {
  const subscription = await retrieveSubscription();

  return (
    <Layout page="billing" sidebar={true} notifications={true}>
      <Billing
        daysLeftToExpiration={subscription.daysLeftToExpiration}
        planName={subscription.name}
        planStatus = {subscription.status}
      />
    </Layout>
  );
}

export default BillingPage;
