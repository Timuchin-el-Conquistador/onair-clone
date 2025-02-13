import NotificationsLayout from "./notifications";

import { retrieveSubscription } from "@/lib/actions/billing";
import {
  retrieveDevices,
  retrieveAccountInformation,
} from "@/lib/actions/user";
import { createUrlAction } from "@/lib/actions/link";

import Sidebar from "../sidebar";

import ErrorBoundary from "../error-bound";
import { retrieveSession } from "@/lib/session";
import InternalServerError from "../Presentational/500";

import {type  Session } from "@/lib/types/user";

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
  const session = await retrieveSession() as Session;
  if (session == null) return <InternalServerError />;

  const subscriptionResponse = await retrieveSubscription();
  const subscription =
    subscriptionResponse instanceof Error || subscriptionResponse == null
      ? null
      : subscriptionResponse;

  const devicesResponse = await retrieveDevices();
  const devices =
    devicesResponse instanceof Error || devicesResponse == null
      ? []
      : devicesResponse;

  let response = await retrieveAccountInformation();

  const account =
    response instanceof Error || response == null ? null : response;

  if (account == null) return <InternalServerError />;

  const monthlyMinutesCapacity = session.monthlyMinutesCapacity as number;

  const monthlyMinutesCapacityReached =
    monthlyMinutesCapacity < account?.monthlyMinutesConsumed;

  return (
    <div className="flex overflow-hidden bg-gray-100 h-screen">
      {sidebar && (
        <Sidebar
          page={page}
          fullName={session.fullName as string}
          email={session.email as string}
        />
      )}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <NotificationsLayout
            hasActiveDevices={devices.length > 0}
            subscription={subscription}
            watchedTutorial={session.watchedTutorial as boolean}
            isNotificationsOn={notifications}
            createUrlAction={createUrlAction}
            monthlyMinutesCapacityReached={monthlyMinutesCapacityReached}
            prevMonthlyMinutesCapacityReached={session.monthlyMinutesCapacityReached}
            user={session.fullName}
          />
          <ErrorBoundary>{children}</ErrorBoundary>
        </main>
      </div>
    </div>
  );
}

export default PrivateLayout;
