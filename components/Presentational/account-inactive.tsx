function AccountInactive() {
  return (
    <div className="max-w-lg mx-auto mt-48 text-center px-8 sm:px-0">
      <div className="text-center">
        <svg
          width="64"
          height="64"
          fill="none"
          stroke="#888"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ display: "inline-block" }}
          className=""
          id=""
        >
          {" "}
          <use xlinkHref="/feather-sprite.svg#alert-circle"></use>{" "}
        </svg>
      </div>

      <div data-cy="big-message-title" className="mt-6 text-xl font-bold">
        Account Inactive
      </div>

      <div className="mt-6 text-base text-justify leading-6">
        The user account associated with this page has been deactivated. Please
        contact the owner of this page directly.
      </div>
    </div>
  );
}


export default AccountInactive
