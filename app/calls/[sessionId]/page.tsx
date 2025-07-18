import Details from ".";

import Layout from "@/components/layouts/private";

import { retrieveCall } from "@/lib/actions/call";

async function DetailsPage(props: { params: { sessionId: string } }) {
  
  const response = await retrieveCall(props.params.sessionId);
  const call = response instanceof Error || response == null ? null : response;

  if (call == null) return;


  return (
    <Layout page="calls" sidebar={true} notifications={true}>
      <Details
        caller={call.callerInfo}
        linkName={call.link.linkName}
        callId={props.params.sessionId}
        callStartedTime={call.callStartedTime}
        callAnsweredTime={call.callAnsweredTime}
        callEndedTime={call.callEndedTime}
        duration={Math.round(call.duration / 60)}
        callStatus={call.callStatus}
        answeredBy={call.callAnsweredBy}
        declinedBy={call.callDeclinedBy}
      />
    </Layout>
  );
}

export default DetailsPage;
