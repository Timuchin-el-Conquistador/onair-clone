import Layout from "@/components/layouts/private";

import BillingPlans from ".";

import { retrievePlans } from "@/lib/actions/billing";

async function BillingPlansPage() {
  const response = await retrievePlans();
  const plans = response instanceof Error || response == null ? [] : response;

  return (
    <Layout page="billing">
      <BillingPlans plans={plans}/>
    </Layout>
  );
}

export default BillingPlansPage;
