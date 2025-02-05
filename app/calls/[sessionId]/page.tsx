import CallSession from ".";

import Layout from "@/components/layouts/private";

import { retrieveCall } from "@/lib/actions/call";

async function CallsPage(props: { params: { sessionId: string } }) {
  const response = await retrieveCall(props.params.sessionId);
  const call = response instanceof Error || response == null ? null : response;

  console.log(call, "call");

  if (call == null) return;

  console.log(call, "CALLL");
  return (
    <Layout page="calls" sidebar={true} notifications={true}>
      <CallSession
        caller={call.callerInfo}
        linkName={call.link.linkName}
        callId={props.params.sessionId}
        callStartedTime={call.callStartedTime}
        callAnsweredTime={call.callAnsweredTime}
        callEndedTime={call.callEndedTime}
        duration={Math.round(call.duration / 60)}
        callStatus={call.callStatus}
        ownerFullName={call.owner.fullName}
        callerCountry={call.callerInfo.country}
        callerCountryCode={call.callerInfo.countryCode}
      />
    </Layout>
  );
}

export default CallsPage;
