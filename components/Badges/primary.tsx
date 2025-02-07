import dynamic from "next/dynamic";

const SlBadge = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/badge/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);
type ComponentProps = {
    children?:React.ReactNode
  }
  
  function Primary(props:ComponentProps) {


    return(
        <SlBadge variant="primary" pulse>{props.children}</SlBadge>
    )
}


export default Primary