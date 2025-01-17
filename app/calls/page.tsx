

import { retrieveCalls } from "@/lib/actions/call";

import Calls from ".";

import Layout from "@/components/layouts/private";

async function CallsPage() {

  const response = await retrieveCalls();
  const calls  = response instanceof Error || response == null ? [] : response;

  console.log(calls)
  return (
    <Layout page="calls">
     <Calls/>
     </Layout>
  );
}

export default CallsPage;
