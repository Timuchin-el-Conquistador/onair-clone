import dynamic from "next/dynamic";

import "@/styles/table.scss";

import { Call } from "@/lib/types/call";

const SlButton = dynamic(
  // Notice how we use the full path to the component. If you only do `import("@shoelace-style/shoelace/dist/react")` you will load the entire component library and not get tree shaking.
  () => import("@shoelace-style/shoelace/dist/react/button/index.js"),
  {
    //loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

const SlBadge = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/badge/index.js"),
  {
    //  loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

type PageProps = {
  sessions: Call[];
  openDrawer: (id: string) => void;
};
function Table(props: PageProps) {
  return (
    <div id="live-sessions" className="mb-4 mx-0 hidden sm:block">
      <div id="table-container">
        <table>
          <thead>
            <tr>
              <td>Visitor</td> 
              <td>Since</td>
              <td className="hidden md:table-cell">Info</td>
              <td className="hidden md:table-cell">Status</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {props.sessions.map((session: Call) => (
              <tr key={session._id}>
                <td className="truncate">
                  <span className="truncate block w-full font-semibold">
                    {session.callerInfo.fullName}
                  </span>
                  {session.callerInfo.email && (
                    <span className="truncate block w-full text-gray-500">
                      {session.callerInfo.email}
                    </span>
                  )}
                </td>
                <td className="truncate">
                  <span className="truncate block w-full font-semibold">
                    a few seconds
                  </span>
                  <span className="text-gray-500">ago</span>
                </td>
                <td className="text-gray-500 hidden md:table-cell">
                  Azerbaijan 🇦🇿
                 <small>Windows, Chrome/131</small>
                </td>
                <td className="hidden text-left md:table-cell">
                  <SlBadge
                    variant={
                      session.callStatus === "live" ? "success" : "primary"
                    }
                    className="inline-block"
                  >
                    {session.callStatus}
                  </SlBadge>
                </td>
                <td>
                  <SlButton
                    size="small"
                    variant="default"
                    data-optional=""
                    data-valid=""
                    onClick={() => props.openDrawer(session._id)}
                  >
                    Open
                  </SlButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
