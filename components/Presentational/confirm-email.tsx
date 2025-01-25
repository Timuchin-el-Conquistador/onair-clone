function ConfirmEmail() {
  return (
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
        Confirm Your Email
      </div>

      <div className="mt-6 text-base text-justify leading-6">
        You need to confirm your email before using OnAir. Please check your
        inbox for confirmation link and further instructions. <br />
        <br />
        If you cannot immediately find the email, please check your SPAM folder
        and Promotions tab.
      </div>
    </div>
  );
}



export default ConfirmEmail