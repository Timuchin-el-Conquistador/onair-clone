import { retrieveCalls } from "@/lib/actions/call";

import Calls from ".";

import Layout from "@/components/layouts/private";

import { retrieveDevices } from "@/lib/actions/user";

async function CallsPage() {
  const response = await retrieveCalls();
  const calls = response instanceof Error || response == null ? [] : response;

  const devicesResponse = await retrieveDevices();
  const devices =
    devicesResponse instanceof Error || devicesResponse == null
      ? []
      : devicesResponse;

  return (
    <Layout page="calls" hasActiveDevices={devices.length > 0}>
      <Calls calls={calls} />
    </Layout>
  );
}

export default CallsPage;
