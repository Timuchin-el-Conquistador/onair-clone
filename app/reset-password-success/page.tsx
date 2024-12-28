import LinkBtn from "@/components/Buttons/link";
import PageHeader from "@/components/auth/page-header";

import "@/styles/restore-password.scss";

function ResetPasswordSuccess() {
  return (
    <main className="flex flex-col justify-center items-center restore-password ">
      <div className="flex flex-col items-center">
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle opacity="0.48" cx="36" cy="36" r="36" fill="#EADFFC" />
          <circle opacity="0.64" cx="36" cy="36" r="24" fill="#D5C0F8" />
          <path
            d="M44 30L33 41L28 36"
            stroke="#7356C0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <PageHeader
          header="Set new password"
          subheader="Your password has been updated"
        />
        

        <LinkBtn url="/login" label="Login" />
      </div>
    </main>
  );
}

export default ResetPasswordSuccess;
