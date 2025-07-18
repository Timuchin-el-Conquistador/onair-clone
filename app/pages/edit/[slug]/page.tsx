
import Edit from ".";

import Layout from "@/components/layouts/private";
import InternalServerError from "@/components/Presentational/500";

import { retrieveUrl, updateUrlAction } from "@/lib/actions/link";
import { retrieveDevices, retrieveStoreIntegrations } from "@/lib/actions/user";
async function EditPage(props: { params: { slug: string } }) {


  const urlResponse = await retrieveUrl(props.params.slug);
  const url =
    urlResponse instanceof Error || urlResponse == null ? null : urlResponse;

  const devicesResponse = await retrieveDevices();
  const devices =
    devicesResponse instanceof Error || devicesResponse == null
      ? []
      : devicesResponse;
  const retrieveIntegratedResponse = await retrieveStoreIntegrations();
  const stores =
  retrieveIntegratedResponse instanceof Error ||
  retrieveIntegratedResponse == null
      ? []
      : retrieveIntegratedResponse;


  if (url == null) {
    return <InternalServerError />;
  };
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
          linkName: url.linkName,
          settings: {
            visitorForm: url.settings.visitorForm,
            onlineMessage: url.settings.onlineMessage,
            offlineMessage: url.settings.offlineMessage,
            recording: true,
          },
          stores: url.stores,
        }}
        updateUrlAction={updateUrlAction}
        devices={devices}
        stores={stores}
      />
    </Layout>
  );
}

export default EditPage;
