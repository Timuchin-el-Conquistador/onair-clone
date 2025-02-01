import "@/styles/user-confirmation.scss";

import ResendConfirmation from ".";
import EmailConfirmed from "@/components/Presentational/email-confirmed";

import { confirmEmail } from "@/lib/actions/user";

async function ConfirmationPage(props: { searchParams: { token: string } }) {
  const response = await confirmEmail(props.searchParams.token);

  const success = !(response instanceof Error);

  return (
    <>
      {success ? (
        <EmailConfirmed />
      ) : (
        <ResendConfirmation error={response.message} />
      )}
    </>
  );
}

export default ConfirmationPage;
