import Integrations from ".";

import {
  retrieveIntegrationsActions,
  removeIntegration
} from "@/lib/actions/user";
import { retrieveSession } from "@/lib/session";
import { type Session } from "@/lib/types/user";

import InternalServerError from "@/components/Presentational/500";
import Layout from "@/components/layouts/private";

async function OnboardingPage() {


  const session = (await retrieveSession()) as Session;
  if (session == null) {
    return <InternalServerError />;
  }

  return (
    <Layout page="onboarding" sidebar={true} notifications={true}>
      <Integrations
        retrieveIntegrationsActions={retrieveIntegrationsActions}
        removeIntegration={removeIntegration}
      />
    </Layout>
  );
}

export default OnboardingPage;
