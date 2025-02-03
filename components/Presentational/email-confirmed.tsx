import Link from "next/link";

function EmailConfirmed() {
    return (
  <>
      <div id="stripe-bar" className="w-full border-t-4 border-brand-400 absolute top-0 left-0 right-0 z-50" ></div>
      <div className="max-w-lg mx-auto mt-48 text-center px-8 sm:px-0">
        <div className="text-center">
          <svg
            width="64"
            height="64"
            fill="none"
            stroke="#2ECC70"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: "inline-block" }}
            className=""
            id=""
          >
            {" "}
            <use xlinkHref="/feather-sprite.svg#check-circle"></use>{" "}
          </svg>
        </div>
  
        <div data-cy="big-message-title" className="mt-6 text-xl font-bold">
        Email now is active
        </div>
  
        <Link href="/users/sign_in">Back to Login</Link>
      </div>
      </>
    );
  }
  
  
  export default EmailConfirmed