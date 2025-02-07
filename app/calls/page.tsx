import { retrieveLinks } from "@/lib/actions/link"; //this returns {slug,linkName}
import Calls from ".";

import Layout from "@/components/layouts/private";

async function CallsPage() {
  const response = await retrieveLinks();
  const allLinks =
    response instanceof Error || response == null ? [] : response;

  return (
    <Layout page="calls" sidebar={true} notifications={true}>
      <Calls allLinks={allLinks} />
    </Layout>
  );
}

export default CallsPage;
