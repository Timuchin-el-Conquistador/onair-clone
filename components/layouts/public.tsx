import { retrieveAccountStatus } from "@/lib/actions/public";
import AccountInactive from "../Presentational/account-inactive";

async function PublicLayout({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string | null;
}) {
  if (userId != null) {

    let response = await retrieveAccountStatus(userId);

    const accountStatus =
      response instanceof Error || response == null ? null : response;

      if(accountStatus != 'active'){
       return  <AccountInactive/>
      }
  }

  return (
 
<>{children}</>
      

  );
}

export default PublicLayout;
