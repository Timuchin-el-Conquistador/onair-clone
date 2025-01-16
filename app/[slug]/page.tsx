import Layout from "@/components/layouts/private";
import Sessions from "./sessions";
import Visitor from "./visitor";
import { verifySession } from "@/lib/dal";
import { retrieveActiveSessions } from "@/lib/actions/session";

async function Page(props: { params: { slug: string } }) {
  const user = await verifySession();

  const slug = props.params.slug;

  
  return (
    <>
      {user != null ? (
        <Layout page="dashboard">
          <Sessions
            domain={process.env.LOCAL_URL || ""}
            slug={slug}
          />
        </Layout>
      ) : (
        <>
          <Visitor />
        </>
      )}
    </>
  );
}

export default Page;
