import Layout from "@/components/layouts/private";

import Billing from ".";

import { retrieveSubscription,removeSubscriptionAction } from "@/lib/actions/billing";

import InternalServerError from "@/components/Presentational/500";



async function BillingPage() {
  const response = await retrieveSubscription();
  const subscription =
  response instanceof Error || response == null ? null : response;

  if(subscription == null) {
    return <InternalServerError/>
  }


  return (
    <Layout page="billing" sidebar={true} notifications={true}>
      <Billing
        daysLeftToExpiration={subscription.daysLeftToExpiration}
        planName={subscription.planName}
        subscriptionStatus = {subscription.subscriptionStatus}
        removeSubscriptionAction={removeSubscriptionAction}

      />
    </Layout>
  );
}

export default BillingPage;
