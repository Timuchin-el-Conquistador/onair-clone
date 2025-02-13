import dynamic from "next/dynamic";

import "@/styles/table.scss";

import { type Call, type Caller } from "@/lib/types/call";

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

type ComponentProps = {
  sessions: Call[];
  openDrawer: (
    sessionId: string,
    slug: string,
    callStartedTime: string,
    caller: Caller,
    callStatus:string,
    callAnsweredBy:string
  ) => void;
};
function Table(props: ComponentProps) {

  return (
    <>
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
                      onClick={() => {
                        // Step 2: Parse the date
                        const date = new Date(
                          session.callStartedTime.replace(
                            /(\d+)(st|nd|rd|th)/,
                            "$1"
                          )
                        );
                        // Step 3: Convert to ISO 8601 format
                        const isoDate = date.toISOString();

                        props.openDrawer(
                          session._id,
                          session.slug,
                          isoDate,
                          session.callerInfo,
                          session.callStatus,
                          session?.callAnsweredBy ?? ''
                        );
                      }}
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

      <div className="mt-4 mb-12 mx-0 sm:mx-0 sm:hidden">
        <ul className="rounded-lg mt-2 divide-y divide-gray-200 overflow-hidden shadow">
          {props.sessions.map((session: Call) => (
            <li
              key={session._id}
              onClick={() => {
                // Step 2: Parse the date
                const date = new Date(
                  session.callStartedTime.replace(/(\d+)(st|nd|rd|th)/, "$1")
                );
                // Step 3: Convert to ISO 8601 format
                const isoDate = date.toISOString();
                props.openDrawer(
                  session._id,
                  session.slug,
                  isoDate,
                  session.callerInfo,
                  session.callStatus,
                  session?.callAnsweredBy ?? ''
                );
              }}
            >
              <div className="block px-4 py-4 bg-white hover:bg-gray-50">
                <span className="flex items-center space-x-4">
                  <span className="flex-1 flex space-x-2 truncate">
                    <span className="flex flex-col text-gray-900 text-sm truncate">
                      <span className="truncate block w-full font-semibold">
                        {session.callerInfo.fullName}
                      </span>{" "}
                      {session.callerInfo.email && (
                        <span className="truncate block w-full text-gray-500">
                          {session.callerInfo.email}
                        </span>
                      )}
                      <span className="truncate block w-full text-gray-500">
                        Meeting with China, a few seconds ago
                      </span>
                    </span>
                  </span>{" "}
                  <span>
                    <SlBadge
                      variant={
                        session.callStatus == "live" ? "success" : "primary"
                      }
                      className="inline-block"
                    >
                      {session.callStatus}
                    </SlBadge>
                  </span>{" "}
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    id=""
                    className="flex-shrink-0 h-7 w-7 text-gray-400"
                    style={{ display: "inline-block" }}
                  >
                    <use xlinkHref="/feather-sprite.svg#chevron-right"></use>
                  </svg>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Table;
