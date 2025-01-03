import dynamic from "next/dynamic";

const SlBadge = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/badge/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);
type PageProps = {
    children?:React.ReactNode
  }
  
  function WarningBadge(props:PageProps) {


    return(
        <SlBadge variant="warning" pulse>{props.children}</SlBadge>
    )
}


export default WarningBadge