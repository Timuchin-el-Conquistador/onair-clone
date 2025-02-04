import PrivateLayout from "@/components/layouts/private";
import PublicLayout from "@/components/layouts/public";

import Sessions from "./sessions";

import Visitor from "../../components/visitor";

import { retrieveUrl } from "@/lib/actions/public";
import { retrieveSession } from "@/lib/session";

import { redirect } from "next/navigation";



async function Page(props: { params: { slug: string } }) {
  const session = await retrieveSession();

  const slug = props.params.slug;

  let response = await retrieveUrl(slug);

  const url = response instanceof Error || response == null ? null : response;

  if (url == null) {
    redirect("/404");
  }

  if (session) {
    return (
      <PrivateLayout page="dashboard" sidebar={true} notifications={true}>
        <Sessions
          domain={process.env.LOCAL_FRONTEND_URL || ""}
          slug={slug}
          url={url}
        />
      </PrivateLayout>
    );
  }
  return (
    <PublicLayout ownerId={url.owner}>
      <Visitor slug={slug} url={url} />
    </PublicLayout>
  );
}

export default Page;
