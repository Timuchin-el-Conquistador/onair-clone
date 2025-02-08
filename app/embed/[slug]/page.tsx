import PrivateLayout from "@/components/layouts/private";
import Embed from ".";

async function EmbedPage(props: { params: { slug: string } }) {

  const isProduction = process.env.NODE_ENV == "production";

  return (
    <PrivateLayout page="dashboard" sidebar={true} notifications={true}>
      <Embed
        domain={isProduction ? process.env.FRONTEND_URL! : process.env.LOCAL_FRONTEND_URL!}
        slug={props.params.slug}
      />
    </PrivateLayout>
  );
}

export default EmbedPage;
