import Edit from ".";

import Layout from "@/components/layouts/private";

import { retrieveUrl, updateUrlAction } from "@/lib/actions/link";
import { retrieveDevices } from "@/lib/actions/user";

async function EditPage(props: { params: { slug: string } }) {
  const urlResponse = await retrieveUrl(props.params.slug);
  const url =
    urlResponse instanceof Error || urlResponse == null ? null : urlResponse;

  const devicesResponse = await retrieveDevices();
  const devices =
    devicesResponse instanceof Error || devicesResponse == null
      ? []
      : devicesResponse;

  if (url == null) return;
  const isProduction = process.env.NODE_ENV == "production";
  return (
    <Layout page="pages" sidebar={true} notifications={true}>
      <Edit
        domain={
          isProduction ? process.env.FRONTEND_URL! : process.env.LOCAL_FRONTEND_URL!
        }
        link={{
          _id: url._id,
          slug: url.slug,
          availability: url.availability,
          callStrategy: url.callStrategy,
          connectedDevices: url.connectedDevices,
          integrations: url.integrations,
          linkName: url.linkName,
          settings: {
            visitorForm: url.settings.visitorForm,
            onlineMessage: url.settings.onlineMessage,
            offlineMessage: url.settings.offlineMessage,
            recording: true,
          },
        }}
        updateUrlAction={updateUrlAction}
        hasConnectedDevices={url.connectedDevices.length > 0}
        hasDevices={devices.length > 0}
        devices={devices}
      />
    </Layout>
  );
}

export default EditPage;
