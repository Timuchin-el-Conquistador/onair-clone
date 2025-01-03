import Settings from ".";

import Layout from "@/components/layouts/Layout";



function SettingsPage(props: { params: { slug: string } }) {
  return (
    <Layout page={`settings`}>
        <Settings initialSettings={{
            user:{
              name:"Cengiz Hamidov",
              email:"cengizhemidov@gmail.com",
              subscription:'Basic Plan (trial)'
            },
            monthlyMinutesCapacity:1000,
            monthlyMinutesConsumed:0,
            browserNotifications:true
          }
        }/>
    </Layout>
  );
}

export default SettingsPage;
