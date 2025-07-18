import Layout from "@/components/layouts/private";
import ShopifyStoreIntegrationPage from ".";

import { createShopifyIntegrationAction } from "@/lib/actions/user";

async function ShopifyStoreIntegration() {
  return (
    <Layout page="integrations" sidebar={true} notifications={true}>
      <ShopifyStoreIntegrationPage createShopifyIntegrationAction={createShopifyIntegrationAction}/>
    </Layout>
  );
}

export default ShopifyStoreIntegration;
