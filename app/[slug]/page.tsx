import PrivateLayout from "@/components/layouts/private";
import PublicLayout from "@/components/layouts/public";

import Sessions from "./sessions";

import Visitor from "../../components/visitor";

import { retrieveUrl } from "@/lib/actions/visitor";
import { retrieveSession } from "@/lib/session";

import InternalServerError from "@/components/Presentational/500";

import {type Session } from "@/lib/types/user";

async function SessionPage(props: { params: { slug: string } }) {
  const session = await retrieveSession() as Session;

  const slug = props.params.slug;

  let response = await retrieveUrl(slug);
  const url = response instanceof Error || response == null ? null : response;


  if (url == null) {
    return <InternalServerError />;
  }

  const isProduction = process.env.NODE_ENV == "production";

  if (session) {
    return (
      <PrivateLayout page="dashboard" sidebar={true} notifications={true}>
        <Sessions
          domain={isProduction ? process.env.FRONTEND_URL! : process.env.LOCAL_FRONTEND_URL!}
          slug={slug}
          url={url}
          monthlyMinutesCapacityReached={session.monthlyMinutesCapacityReached as boolean}
          user ={session.fullName}
        />
      </PrivateLayout>
    );
  }
  return (
    <PublicLayout email={url.owner.email}>
      <Visitor slug={slug} url={url} />
    </PublicLayout>
  );
}

export default SessionPage;
