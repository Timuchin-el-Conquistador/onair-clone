import "@/styles/user-confirmation.scss";

import ResetPassword from ".";

async function ResetPasswordPage(props: { searchParams: { token: string } }) {

    
  return <ResetPassword token={props.searchParams.token}/>;
}

export default ResetPasswordPage;
