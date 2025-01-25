import Edit from ".";

import Layout from "@/components/layouts/private";

import { retrieveUrlAction, updateUrlAction } from "@/lib/actions/link";
import { retrieveDevices } from "@/lib/actions/user";

async function EditPage(props: { params: { slug: string } }) {
  const urlResponse = await retrieveUrlAction(props.params.slug);
  const url =
    urlResponse instanceof Error || urlResponse == null ? null : urlResponse;

  const devicesResponse = await retrieveDevices();
  const devices =
  devicesResponse instanceof Error ||
  devicesResponse == null
      ? []
      : devicesResponse;



  if(url == null) return
  return (
    <Layout page={`pages/edit`}>
      <Edit
        link={{
          _id: url._id,
          slug: url.slug,
          availability: url.availability,
          callStrategy: url.callStrategy,
          connectedDevices: url.connectedDevices,
          linkName: "Meeting with Cingiz",
          settings: {
            visitorForm: ["email"],
            onlineMessage: "Introduce yourself and press call.",
            offlineMessage: "We'll get back soon..",
            recording: true,
          },
        }}
        updateUrlAction={updateUrlAction}
        hasConnectedDevices={url.connectedDevices.length>0}
        hasDevices={devices.length>0}
        devices={devices}
      />
    </Layout>
  );
}

export default EditPage;
