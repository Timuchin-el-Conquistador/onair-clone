import Recording from ".";

import Layout from "@/components/layouts/private";

import { retrieveAudioRecordUrlAction } from "@/lib/actions/call";

async function RecordingPage(props: { params: { sessionId: string } }) {



 
  return (
    <Layout page="calls" sidebar={true} notifications={true}>
      <Recording

      
        callId={props.params.sessionId}
        retrieveAudioRecordUrlAction={retrieveAudioRecordUrlAction}

      />
    </Layout>
  );
}

export default RecordingPage;