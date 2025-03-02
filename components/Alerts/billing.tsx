function SubscriptionExpired() {
  return (
    <div className="p-4 border-l-4 mx-6 mb-0 mt-6 bg-yellow-50 border-yellow-400 ">
      <div className="flex items-center">
        <div className="flex items-center flex-shrink-0">
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="#e67e22"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: "inline-block", position: "relative" }}
            className=""
            id=""
          >
            {" "}
            <use xlinkHref="/feather-sprite.svg#alert-triangle"></use>{" "}
          </svg>
        </div>

        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            Your subscription has expired. Please renew from{" "}
            <a
              href="/billing/choose_plan"
              className="underline text-yellow-700 hover:text-yellow-600"
            >
              Billing
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function IncompletePayment() {
  return (
    <div className="p-4 border-l-4 mx-6 mb-0 mt-6 bg-yellow-50 border-yellow-400 ">
      <div className="flex items-center">
        <div className="flex items-center flex-shrink-0">
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="#e67e22"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: "inline-block", position: "relative" }}
            className=""
            id=""
          >
            {" "}
            <use xlinkHref="/feather-sprite.svg#alert-triangle"></use>{" "}
          </svg>
        </div>

        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            Subscription Incomplete There was an issue processing your
            subscription. Please check your payment details and update them to
            continue your subscription.
            <a
              href="/billing/choose_plan"
              className="underline text-yellow-700 hover:text-yellow-600"
            >
              Billing
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function NoActiveSubscription() {
  return (
    <div className="p-4 border-l-4 mx-6 mb-0 mt-6 bg-yellow-50 border-yellow-400 ">
      <div className="flex items-center">
        <div className="flex items-center flex-shrink-0">
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="#e67e22"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: "inline-block", position: "relative" }}
            className=""
            id=""
          >
            {" "}
            <use xlinkHref="/feather-sprite.svg#alert-triangle"></use>{" "}
          </svg>
        </div>

        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            You currently don't have an active subscription. To access our
            premium features, please choose a plan and subscribe.
            <a
              href="/billing/choose_plan"
              className="underline text-yellow-700 hover:text-yellow-600"
            >
              Billing
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function TrialPlanWIllSoonEnd({ days }: { days: number }) {
  return (
    <div className="p-4 border-l-4 mx-6 mb-0 mt-6 bg-yellow-50 border-yellow-400 ">
      <div className="flex items-center">
        <div className="flex items-center flex-shrink-0">
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="#e67e22"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: "inline-block", position: "relative" }}
            className=""
            id=""
          >
            {" "}
            <use xlinkHref="/feather-sprite.svg#alert-triangle"></use>{" "}
          </svg>
        </div>

        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            Your trial period will end in {days} days.
          </p>
        </div>
      </div>
    </div>
  );
}

export {
  SubscriptionExpired,
  IncompletePayment,
  NoActiveSubscription,
  TrialPlanWIllSoonEnd,
};
