
import Layout from "@/components/layouts/private";

import "@/styles/dashboard.scss";

import Dashboard from ".";

import { retrieveUrls } from "@/lib/actions/link";



async function DashboardPage() {



  const response = await retrieveUrls();
  const links  = response instanceof Error || response == null ? [] : response;

  

  return (
    <Layout page="dashboard">
      <Dashboard links={links}/>
    </Layout>
  );
}

export default DashboardPage;
