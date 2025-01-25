
import Layout from "@/components/layouts/private";

import Dashboard from ".";

import { retrieveUrlsAction, removeLinkAction } from "@/lib/actions/link";

import { retrieveDevices } from "@/lib/actions/user";

async function DashboardPage() {



    const devicesResponse =  await retrieveDevices();
    const devices  = devicesResponse instanceof Error || devicesResponse == null ? [] : devicesResponse;



  return (
    <Layout page="dashboard" hasActiveDevices={devices.length>0}>
      <Dashboard  removeLinkAction={removeLinkAction} retrieveUrlsAction={retrieveUrlsAction}/>
    </Layout>
  );
}

export default DashboardPage;
