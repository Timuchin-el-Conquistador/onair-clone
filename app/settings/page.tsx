import Settings from ".";

import Layout from "@/components/layouts/private";

import { retrieveAccountInformationAction } from "@/lib/actions/user";

async function SettingsPage() {
  const response = await retrieveAccountInformationAction();
  const account =
  response instanceof Error || response == null ? null : response;
  if(account == null) return <></>
  return (
    <Layout page="settings" sidebar={true} notifications={true}>
      <Settings
        user={{
          fullName: account.name,
          email: account.email,
        }}
        monthlyMinutesCapacity={account.monthlyMinutesCapacity}
        monthlyMinutesConsumed={account.monthlyMinutesConsumed}
        browserNotifications={true}
        numberOfCreatedLinks={account.numberOfCreatedLinks}
        plan={account.plan}
        monthlyLinksCapacity={account.monthlyLinksCapacity}
      />
    </Layout>
  );
}

export default SettingsPage;
