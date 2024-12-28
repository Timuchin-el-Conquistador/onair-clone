import Link from "next/link";

import "@/styles/layouts.scss";
import Sidebar from "../sidebar";


import Warning from "../Alerts/warning";

function Layout({
  children,
  page,
}: {
  children: React.ReactNode;
  page: string;
}) {
  return (
    <div className="flex overflow-hidden bg-gray-100 h-screen">
      <Sidebar page={page} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <Warning/>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
