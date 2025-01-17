import Layout from "@/components/layouts/private";
import Sessions from "./sessions";
import Visitor from "../../components/visitor";

import { retrieveSession } from "@/lib/actions/user";
import { retrieveUrlAction as publicRetrieveUrlAction } from "@/lib/actions/public";
import { retrieveUrlAction as privateRetrieveUrlAction } from "@/lib/actions/link";

async function Page(props: { params: { slug: string } }) {
  const session = await retrieveSession();

  const slug = props.params.slug;

  let response;
  if (session) {
    response = await privateRetrieveUrlAction(slug);
  } else {
    response = await publicRetrieveUrlAction(slug);
  }

  const url = response instanceof Error || response == null ? null : response;
console.log(url)
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
