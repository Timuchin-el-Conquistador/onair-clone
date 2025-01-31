import Settings from ".";

import Layout from "@/components/layouts/private";

function SettingsPage(props: { params: { slug: string } }) {
  return (
    <Layout page="settings" sidebar={true} notifications={true}>
      <Settings
        user={{
          fullName: "Cengiz Hamidov",
          email: "cengizhemidov@gmail.com",
        }}
        monthlyMinutesCapacity={1000}
        monthlyMinutesConsumed={0}
        browserNotifications={true}
      />
    </Layout>
  );
}

export default SettingsPage;
