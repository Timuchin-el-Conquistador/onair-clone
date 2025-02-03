import Layout from "@/components/layouts/private";

import Dashboard from ".";

import { retrieveUrlsAction, removeLinkAction } from "@/lib/actions/link";
import { retrieveSession } from "@/lib/session";

import { redirect } from "next/navigation";

async function DashboardPage() {
  const session = await retrieveSession();
  if (session == null) {
    redirect("/404");
  }
  return (
    <Layout page="dashboard" sidebar={true} notifications={true}>
      <Dashboard
        removeLinkAction={removeLinkAction}
        retrieveUrlsAction={retrieveUrlsAction}
        monthlyLinksCapacity={session.monthlyLinksCapacity as number}
      />
    </Layout>
  );
}

export default DashboardPage;
