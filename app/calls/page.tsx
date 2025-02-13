import { retrieveLinks } from "@/lib/actions/link"; //this returns {slug,linkName}
import { retrieveSession } from "@/lib/session";

import Calls from ".";

import Layout from "@/components/layouts/private";

import { type Session } from "@/lib/types/user";

async function CallsPage() {
  const session = await retrieveSession() as Session;

  const response = await retrieveLinks();
  const allLinks =
    response instanceof Error || response == null ? [] : response;

  return (
    <Layout page="calls" sidebar={true} notifications={true}>
      <Calls
        allLinks={allLinks}
        user={session.fullName}
        monthlyMinutesCapacityReached={
          session!.monthlyMinutesCapacityReached as boolean
        }
      />
    </Layout>
  );
}

export default CallsPage;
