import { retrieveAccountStatus } from "@/lib/actions/public";
import AccountInactive from "../Presentational/account-inactive";

import ErrorBoundary from "../error-bound";

async function PublicLayout({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId?: string ;
}) {
  if (userId) {
    let response = await retrieveAccountStatus(userId);

    const accountStatus =
      response instanceof Error || response == null ? null : response;

    if (accountStatus != "active") {
      return <AccountInactive />;
    }
  }

  return <ErrorBoundary>{children}</ErrorBoundary>;
}

export default PublicLayout;
