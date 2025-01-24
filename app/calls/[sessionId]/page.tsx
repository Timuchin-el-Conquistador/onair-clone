


import CallSession from ".";

import Layout from "@/components/layouts/private";

import { retrieveCalls } from "@/lib/actions/call";

async function CallsPage() {

 const response = await retrieveCalls();
  const calls  = response instanceof Error || response == null ? [] : response;


  return (
    <Layout page="calls">
     <CallSession/>
     </Layout>
  );
}

export default CallsPage;
