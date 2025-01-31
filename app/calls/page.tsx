import { retrieveCalls } from "@/lib/actions/call";

import Calls from ".";

import Layout from "@/components/layouts/private";



async function CallsPage() {
  const response = await retrieveCalls();
  const calls = response instanceof Error || response == null ? [] : response;


  return (
    <Layout page="calls" sidebar={true} notifications={true}>
      <Calls calls={calls} />
    </Layout>
  );
}

export default CallsPage;
