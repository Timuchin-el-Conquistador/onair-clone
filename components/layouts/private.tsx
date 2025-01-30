import "@/styles/layouts.scss";

import NotificationsLayout from "./notifications";

import { retrieveSubscription } from "@/lib/actions/user";
import { retrieveDevices } from "@/lib/actions/user";
import { retrieveUser } from "@/lib/actions/user";

async function PrivateLayout({
  children,
  page,
}: {
  children: React.ReactNode;
  page: string;
}) {
  const user = await retrieveUser();
  const subscription = await retrieveSubscription();

  const devicesResponse = await retrieveDevices();
  const devices =
    devicesResponse instanceof Error || devicesResponse == null
      ? []
      : devicesResponse;
console.log(devices)
  return (
    <div className="flex overflow-hidden bg-gray-100 h-screen">
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <NotificationsLayout
            page={page}
            hasActiveDevices={devices.length > 0}
            subscription={subscription}
            userId={user.userId as string}
          >
            {children}
          </NotificationsLayout>
        </main>
      </div>
    </div>
  );
}

export default PrivateLayout;
