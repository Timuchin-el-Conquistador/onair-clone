

import "@/styles/billing/billing.scss";

import "@/styles/fag.scss";

function Billing() {
  return (
    <div id="billing" className="p-6">
      <div className="bg-white p-6">
        <div className="px-4 pb-8">
          <div className="grid grid-cols-3 gap-4 max-w-4xl mt-12">
            <div className="text-center">
              <div className="mb-4">
                <svg
                  width="84"
                  height="84"
                  fill="none"
                  stroke="#2ecc71"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  id=""
                  style={{ display: "inline-block" }}
                >
                  <use xlinkHref="/feather-sprite.svg#coffee"></use>
                </svg>
              </div>{" "}
              <div className="font-bold text-lg mb-2">Basic Plan, 1 seat</div>{" "}
              <div className="text-gray-800 mb-2"></div>
            </div>{" "}
            <div className="col-span-2 px-4 leading-8">
              You're on a free trial. Your trial ends after 0 days. Sign up to a
              paid plan and get full access by clicking on "Subscribe" below.
            </div>{" "}
            <div className="col-span-3 text-center mt-8">
              <a
                href="/billing/choose_plan"
                className="btn btn-blue text-center mr-4"
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>{" "}
        <div id="faq" className="mt-32" style={{ opacity: "1" }}>
          <h3>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ display: "inline-block" }}
              className=""
              id=""
            >
              {" "}
              <use xlinkHref="/feather-sprite.svg#plus-square"></use>{" "}
            </svg>
            Can I pay for my colleagues?
          </h3>{" "}
          <div className="answer">
            Yes. First make sure you have the right number of licenses (or
            "seats"). You need to purchase one seat for each colleague you
            invite, including yourself. Then create a{" "}
            <a href="/organizations">Organization</a>, and invite them under
            that organization. This will bring in all members under your billing
            account.
            <br />
            <br />
          </div>{" "}
          <h3>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ display: "inline-block" }}
              className=""
              id=""
            >
              {" "}
              <use xlinkHref="/feather-sprite.svg#plus-square"></use>{" "}
            </svg>
            Do you offer invoicing?
          </h3>{" "}
          <div className="answer">
            Custom invoicing is strictly offered for accounts with more than
            $1,500 USD monthly subscription.
          </div>
        </div>
      </div>
    </div>
  );
}



export default Billing