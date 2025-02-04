import { retrieveAccountStatus } from "@/lib/actions/public";
import PublicSocketsLayout from "./public-socket";
import AccountInactive from "../Presentational/account-inactive";

async function PublicLayout({
  children,
  ownerId,
}: {
  children: React.ReactNode;
  ownerId: string | null;
}) {
  if (ownerId != null) {

    console.log(ownerId)
    let response = await retrieveAccountStatus(ownerId);

    const accountStatus =
      response instanceof Error || response == null ? null : response;

   
      console.log(accountStatus)
      if(accountStatus != 'active'){
       return  <AccountInactive/>
      }
  }

  return (
    <>
      <PublicSocketsLayout />
      {children}
    </>
  );
}

export default PublicLayout;
