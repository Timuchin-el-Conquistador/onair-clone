import PrivateLayout from "@/components/layouts/private";
import Embed from ".";

async function EmbedPage(props: { params: { slug: string } }) {
  return (
    <PrivateLayout page="dashboard" sidebar={true} notifications={true}>
      <Embed
        domain={process.env.FRONTEND_URL || ""}
        slug={props.params.slug}
      />
    </PrivateLayout>
  );
}

export default EmbedPage;
