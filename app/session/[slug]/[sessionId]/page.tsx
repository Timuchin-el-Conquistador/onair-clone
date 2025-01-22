import ConferenceRoom from ".";
import { retrieveSession } from "@/lib/actions/user";

import {
  retrieveUrlAction as publicRetrieveUrlAction,
  retrieveCallSession,
} from "@/lib/actions/public";
import { retrieveUrlAction as privateRetrieveUrlAction } from "@/lib/actions/link";

async function ConferenceRoomPage(props: {
  params: { slug: string; sessionId: string };
}) {
  const session = await retrieveSession();

  const slug = props.params.slug;

  let response;
  if (session) {
    response = await privateRetrieveUrlAction(slug);
  } else {
    response = await publicRetrieveUrlAction(slug);
  }

  const url = response instanceof Error || response == null ? null : response;

  response = await retrieveCallSession(props.params.sessionId);

  const call = response instanceof Error || response == null ? null : response;

  return (
    <ConferenceRoom
      url={url!}
      isAuth={session != null}
      call={call!}
      slug={slug}
      sessionId={props.params.sessionId}
    />
  );
}

export default ConferenceRoomPage;
