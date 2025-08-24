import { retrieveUserAccountStatus } from "@/lib/actions/visitor";
import AccountInactive from "../Presentational/account-inactive";

import ErrorBoundary from "../error-bound";

async function PublicLayout({
  children,
  email,
}: {
  children: React.ReactNode;
  email?: string ;
}) {
/*  if (email) {
    let response = await retrieveUserAccountStatus(email);

    const account =
      response instanceof Error || response == null ? null : {role:response.role, status:response.accountStatus};

    if (account?.status != "active" && account?.role != 'admin') {
      return <AccountInactive />;
    }
  }*/

  return <ErrorBoundary>{children}</ErrorBoundary>;
}

export default PublicLayout;
