import NotificationsLayout from "./notifications";

import { retrieveSubscription } from "@/lib/actions/billing";
import { retrieveDevices, retrieveUser } from "@/lib/actions/user";
import { createUrlAction } from "@/lib/actions/link";

import Sidebar from "../sidebar";

async function PrivateLayout({
  children,
  page,
  sidebar,
  notifications,
}: {
  children: React.ReactNode;
  page: string;
  sidebar: boolean;
  notifications: boolean;
}) {
  const user = await retrieveUser();

  const responseResponse  = await retrieveSubscription();
  const subscription =
  responseResponse instanceof Error || responseResponse == null
      ? null
      : responseResponse;
  const devicesResponse = await retrieveDevices();
  const devices =
    devicesResponse instanceof Error || devicesResponse == null
      ? []
      : devicesResponse;
console.log(user, devices,subscription)
  return (
    <div className="flex overflow-hidden bg-gray-100 h-screen">
      {sidebar && (
        <Sidebar
          page={page}
          fullName={user.fullName as string}
          email={user.email as string}
        />
      )}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <NotificationsLayout
            hasActiveDevices={devices.length > 0}
            subscription={subscription}
            userId={user.userId as string}
            watchedTutorial={user.watchedTutorial}
            isNotificationsOn={notifications}
            createUrlAction={createUrlAction}
          />

          {children}
        </main>
      </div>
    </div>
  );
}

export default PrivateLayout;
