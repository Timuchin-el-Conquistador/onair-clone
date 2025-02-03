import Layout from "@/components/layouts/private";

import Sessions from "./sessions";

import Visitor from "../../components/visitor";


import { retrieveUrlAction as publicRetrieveUrlAction } from "@/lib/actions/public";
import { retrieveUrlAction as privateRetrieveUrlAction } from "@/lib/actions/link";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

async function Page(props: { params: { slug: string } }) {
  const session = await verifySession();

  const slug = props.params.slug;

  let response;
  if (session) {
    response = await privateRetrieveUrlAction(slug);
  } else {
    response = await publicRetrieveUrlAction(slug);
  }

  const url = response instanceof Error || response == null ? null : response;


if(url == null) {
  redirect('/404')
}
  return (
    <>
      {session && url != null ? (
        <Layout page="dashboard" sidebar={true} notifications={true}>
          <Sessions
            domain={process.env.FRONTEND_URL || ""}
            slug={slug}
            url={url}
          />
        </Layout>
      ) : url != null ? (
        <Visitor slug={slug} url={url} />
      ) : null}
    </>
  );
}

export default Page;
