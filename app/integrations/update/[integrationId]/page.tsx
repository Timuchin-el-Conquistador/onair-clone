"use client";

import "@/styles/integrations/new-integration.scss";

import Primary from "@/components/Badges/primary";
import Layout from "@/components/layouts/private";
import Device from "@/components/Integrations/device";



function EditDeviceIntegration() {
  return (
    <Layout page="integrations">
      <Device />
    </Layout>
  );
}

export default EditDeviceIntegration;
