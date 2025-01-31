
import Layout from "@/components/layouts/private";

import Dashboard from ".";

import { retrieveUrlsAction, removeLinkAction } from "@/lib/actions/link";



async function DashboardPage() {



  return (
    <Layout page="dashboard" sidebar={true} notifications={true}>
      <Dashboard  removeLinkAction={removeLinkAction} retrieveUrlsAction={retrieveUrlsAction}/>
    </Layout>
  );
}

export default DashboardPage;
