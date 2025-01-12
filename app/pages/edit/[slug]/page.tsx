import Edit from ".";

import Layout from "@/components/layouts/Layout";

function EditPage(props: { params: { slug: string } }) {
  return (
    <Layout page={`pages/edit`}>
      <Edit
        link={{
          _id: "11",
          slug: props.params.slug,
          availability: "scheduled",
          callStrategy:null,
          connectedDevices:[],
          linkName: "Meeting with Cingiz",
          integrations: [
            { _id: "01", type: "mobile", name: "Chingiz's Android" },
          ],
          settings: {
            visitorForm: ["email"],
            onlineMessage: "Introduce yourself and press call.",
            offlineMessage: "We'll get back soon..",
            recording: true,
          },
        }}
      />
    </Layout>
  );
}

export default EditPage;
