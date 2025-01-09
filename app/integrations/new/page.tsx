'use client'

import '@/styles/integrations/new-integration.scss'

import Primary from "@/components/Badges/primary";
import Layout from "@/components/layouts/Layout";

function NewIntegration() {
  return (
    <Layout page="integrations">
      <div id="main" className="p-6">
        <div className="integ-card">
          <img src="/external-logos/mobile.svg" /> <h5>Mobile</h5>{" "}
          <p>Receive a mobile notification upon meetings.</p>{" "}
          <a href="/integrations/new/mobile" className="btn btn-blue">
            Add Integration
          </a>
        </div>{" "}
        <div className="integ-card">
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
        </div>
      </div>
    </Layout>
  );
}

export default NewIntegration;
