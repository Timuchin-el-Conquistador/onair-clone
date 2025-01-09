import NewLink from ".";

import Layout from "@/components/layouts/Layout";

function EditPage(props: { params: { slug: string } }) {
  return (
    <Layout page={`pages/edit`}>
      <NewLink
         deviceConnected={false}
         integrations={[]}
      />
    </Layout>
  );
}

export default EditPage;
