
import Layout from "@/components/layouts/Layout";

import "@/styles/dashboard.scss";

import Dashboard from ".";

import { type Link } from "@/lib/types/links";

import { retrieveUrls } from "@/lib/actions/link";

async function DashboardPage() {



  const response = await retrieveUrls();
  const links  = response instanceof Error || response == null ? [] : response;
  console.log('links', links)
  
  /*const links: Link[] = [
    {
      _id: "11",
      slug:'timuchin',
      availability: "always online",
      linkName: "Meeting with Cingiz",
      integrations: [{_id:'01',type:'mobile', name:"Chingiz's Android" }],
      timeLength: 0,
    },
    {
      _id: "12",
      slug:'timuchin',
      availability: "always offline",
      linkName: "Meeting with Cingiz",
      integrations: [{_id:'02',type:'mobile', name:"Chingiz's Android" }],
      timeLength: 0,
    },
    {
      _id: "13",
      slug:'timuchin',
      availability: "always online",
      linkName: "Meeting with Cingiz",
      integrations: [{_id:'03',type:'mobile', name:"Chingiz's Android" }],
      timeLength: 0,
    },
    {
      _id: "14",
      slug:'timuchin',
      availability: "always online",
      linkName: "Meeting with Cingiz",
      integrations: [],
      timeLength: 0,
    },
    {
      _id: "15",
      slug:'timuchin',
      availability: "always online",
      linkName: "Meeting with Cingiz",
      integrations: [{_id:'05',type:'mobile', name:"Chingiz's Android" }],
      timeLength: 0,
    },
  ];*/

  return (
    <Layout page="dashboard">
      <Dashboard links={links} />
    </Layout>
  );
}

export default DashboardPage;
