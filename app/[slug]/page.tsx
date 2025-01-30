import Layout from "@/components/layouts/private";

import Sessions from "./sessions";

import Visitor from "../../components/visitor";


import { retrieveUrlAction as publicRetrieveUrlAction } from "@/lib/actions/public";
import { retrieveUrlAction as privateRetrieveUrlAction } from "@/lib/actions/link";
import { verifySession } from "@/lib/dal";

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



  return (
    <>
      {session && url != null ? (
        <Layout page="dashboard">
          <Sessions
            domain={process.env.LOCAL_URL || ""}
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
