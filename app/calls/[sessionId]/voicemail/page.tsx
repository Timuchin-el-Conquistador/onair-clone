import Recording from ".";

import Layout from "@/components/layouts/private";
import { retrieveSubscription } from "@/lib/actions/billing";

import { retrieveAudioRecordUrlAction } from "@/lib/actions/call";

async function RecordingPage(props: { params: { sessionId: string } }) {


const response= await  retrieveSubscription()
const subscription =
response instanceof Error || response == null ? null : response;

  return (
    <Layout page="calls" sidebar={true} notifications={true}>
      <Recording
        callId={props.params.sessionId}
        retrieveAudioRecordUrlAction={retrieveAudioRecordUrlAction}
        planName={subscription.planName}
      />
    </Layout>
  );
}

export default RecordingPage;