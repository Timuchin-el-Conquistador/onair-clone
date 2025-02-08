
import dynamic from "next/dynamic";




import { retrieveUrlsAction, removeLinkAction } from "@/lib/actions/link";

import { retrieveSession } from "@/lib/session";


import { type Session } from "@/lib/types/user";

import InternalServerError from "@/components/Presentational/500";
import Layout from "@/components/layouts/private";

const Dashboard = dynamic(() => import('.'));

async function DashboardPage() {
  const session = await retrieveSession() as Session;
  if (session == null) {
    return <InternalServerError/>
  }
  return (
    <Layout page="dashboard" sidebar={true} notifications={true}>
      <Dashboard
        removeLinkAction={removeLinkAction}
        retrieveUrlsAction={retrieveUrlsAction}
        monthlyLinksCapacity={session.monthlyLinksCapacity as number}
        planName={session.planName}
      />
    </Layout>
  );
}

export default DashboardPage;
