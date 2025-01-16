import Layout from "@/components/layouts/private";
import Integrations from ".";

import { type Link } from "@/lib/types/links";

function IntegrationsPage() {

      const links: Link[] = [
        {
          _id: "11",
          slug:'timuchin',
          availability: "always online",
          linkName: "Meeting with Cingiz",
          integrations: [{_id:'01',type:'mobile', name:"Chingiz's Android" }],
          timeLength: 0,
        },

      ];
  return (
    <Layout page='integrations'>
        <Integrations links={links} />
    </Layout>
  );
}



export default IntegrationsPage
