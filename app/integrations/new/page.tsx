import "@/styles/integrations/new-integration.scss";

import { retrieveStoreIntegrationAction } from "@/lib/actions/user";

import Layout from "@/components/layouts/private";

async function NewIntegration() {
  const response = await retrieveStoreIntegrationAction();

  const storeIntegration =
    response instanceof Error || response == null ? null : response.integration;

  return (
    <Layout page="integrations" sidebar={true} notifications={true}>
      <div id="main" className="p-6 flex gap-4 flex-wrap gap-4">
        <div className="integ-card">
          <img src="/external-logos/mobile.svg" /> <h5>Mobile</h5>{" "}
          <p>Receive a mobile notification upon meetings.</p>{" "}
          <a href="/integrations/new/mobile" className="btn btn-blue">
            Add Integration
          </a>
        </div>{" "}
        {!storeIntegration && (
          <div className="integ-card">
            <img src="/shopify.png" /> <h5>Shopify store</h5>{" "}
            <p>
              Connect your Shopify store for real-time in-store support and VoIP
              communication.
            </p>{" "}
            <a href="/integrations/new/shopify" className="btn btn-blue">
              Add Integration
            </a>
          </div>
        )}
        {/*} <div className="integ-card">
          <img src="/external-logos/google-calendar-icon.svg" />{" "}
          <h5>Google Calendar</h5>{" "}
          <p>Read availability from Google Calendar.</p>{" "}
          <a href="/integrations/new/google_calendar" className="btn btn-blue">
            Add Integration
          </a>
        </div>{" "}
        <div className="integ-card">
          <img src="/external-logos/webhooks-icon.svg" />{" "}
          <h5>Webhook</h5> <p>Receive a Webhook notification upon meetings.</p>{" "}
          <a href="/integrations/new/webhook" className="btn btn-blue">
            Add Integration
          </a>
        </div>{" "}
        <div className="integ-card slack">
          <img src="/external-logos/slack-icon.svg" />{" "}
          <div className="flex justify-center items-center">
            <h5>Slack</h5>{" "}
            <div className="ml-1 mt-4">
                 <Primary>
                    coming soon
                 </Primary>
            </div>
          </div>{" "}
          <p>Receive a Slack notification upon meetings.</p>{" "}
          <a
            href="/integrations/new/slack"
            className="btn btn-gray cursor-not-allowed"
          >
            Add Integration
          </a>
        </div>*/}
      </div>
    </Layout>
  );
}

export default NewIntegration;
