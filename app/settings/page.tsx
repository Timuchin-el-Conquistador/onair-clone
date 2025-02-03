import Settings from ".";

import Layout from "@/components/layouts/private";
import InternalServerError from "@/components/Presentational/500";

import { retrieveAccountInformationAction } from "@/lib/actions/user";

async function SettingsPage() {
  const response = await retrieveAccountInformationAction();
  const account =
  response instanceof Error || response == null ? null : response;

  if(account == null) {
    return <InternalServerError/>
  }


  return (
    <Layout page="settings" sidebar={true} notifications={true}>
      <Settings
        user={{
          fullName: account.name,
          email: account.email,
        }}
        monthlyMinutesCapacity={account.monthlyMinutesCapacity}
        monthlyMinutesConsumed={account.monthlyMinutesConsumed}
        browserNotifications={account.browserNotifications}
        numberOfCreatedLinks={account.numberOfCreatedLinks}
        planName={account.planName}
        monthlyLinksCapacity={account.monthlyLinksCapacity}
        subscriptionStatus={account.subscriptionStatus}
      />
    </Layout>
  );
}

export default SettingsPage;
