import ActiveCallSession from ".";

import { verifySession } from "@/lib/dal";
import {
  retrieveUrlAction as publicRetrieveUrlAction,
  retrieveActiveCallSession,
} from "@/lib/actions/public";

import Layout from "@/components/layouts/private";

async function ActiveCallSessionPage(props: {
  params: { slug: string; sessionId: string };
}) {
  const session = await verifySession();

  const slug = props.params.slug;

  const urlResponse = await publicRetrieveUrlAction(slug);
  const url =
    urlResponse instanceof Error || urlResponse == null ? null : urlResponse;

  const callResponse = await retrieveActiveCallSession(props.params.sessionId);
  const call =
    callResponse instanceof Error || callResponse == null ? null : callResponse;
  if (session) {
    return (
      <Layout page="" sidebar={false} notifications={false}>
        <ActiveCallSession
          url={url!}
          isAuth={session != null}
          call={call!}
          slug={slug}
          sessionId={props.params.sessionId}
        />
      </Layout>
    );
  }
  return (
    <ActiveCallSession
      url={url!}
      isAuth={session != null}
      call={call!}
      slug={slug}
      sessionId={props.params.sessionId}
    />
  );
}

export default ActiveCallSessionPage;
