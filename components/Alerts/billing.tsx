function SubscriptionExpired(){



    return(
        <div className="p-4 border-l-4 mx-6 mb-0 mt-6 bg-yellow-50 border-yellow-400 ">
        <div className="flex items-center">
          <div className="flex items-center flex-shrink-0">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="#e67e22"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
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
    )
}


export {SubscriptionExpired}