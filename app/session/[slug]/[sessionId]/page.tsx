import ActiveCallSession from ".";

import { retrieveUrl, retrieveActiveCallSession } from "@/lib/actions/public";
import { retrieveAccountInformation } from "@/lib/actions/user";
import { retrieveSession } from "@/lib/session";

import Layout from "@/components/layouts/private";
import InternalServerError from "@/components/Presentational/500";
import PublicLayout from "@/components/layouts/public";

import { Session } from "@/lib/types/user";

async function ActiveCallSessionPage(props: {
  params: { slug: string; sessionId: string };
}) {
  const session = (await retrieveSession()) as Session;

  const slug = props.params.slug;

  const urlResponse = await retrieveUrl(slug);
  const url =
    urlResponse instanceof Error || urlResponse == null ? null : urlResponse;

  if (url == null) {
    return <InternalServerError />;
  }

  const callResponse = await retrieveActiveCallSession(props.params.sessionId);
  const call =
    callResponse instanceof Error || callResponse == null ? null : callResponse;

  if (call == null) {
    return <InternalServerError />;
  }




  if (session) {
    return (
      <Layout page="" sidebar={false} notifications={false}>
        <ActiveCallSession
          url={url!}
          isAuth={true}
          userEmail={session.email}
          call={call!}
          slug={slug}
          sessionId={props.params.sessionId}
          monthlyMinutesCapacityReached={session.monthlyMinutesCapacityReached as boolean}
        />
      </Layout>
    );
  }
  return (
    <PublicLayout>
      <ActiveCallSession
        url={url!}
        isAuth={session != null}
        call={call!}
        slug={slug}
        sessionId={props.params.sessionId}
      />
    </PublicLayout>
  );
}

export default ActiveCallSessionPage;
