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
  
  function WarningBadge(props:ComponentProps) {


    return(
        <SlBadge variant="warning" pulse>{props.children}</SlBadge>
    )
}


export default WarningBadge