import Settings from ".";

import Layout from "@/components/layouts/Layout";

function SettingsPage(props: { params: { slug: string } }) {
  return (
    <Layout page={`pages/edit`}>
        <Settings/>
    </Layout>
  );
}

export default SettingsPage;
