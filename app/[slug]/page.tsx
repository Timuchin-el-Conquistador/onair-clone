import Layout from "@/components/layouts/Layout";
import IncommingCalls from "./incoming-call";
import Visitor from "./visitor";
import { verifySession } from "@/lib/dal";


async function Page(props: { params: { slug: string } }) {
  const user = await verifySession();


  console.log(user, 'user')
  const slug = props.params.slug;

  if (user == null) {
  }
  return (
    <>
      {user != null ? (
        <Layout page="dashboard">
          <IncommingCalls />
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
