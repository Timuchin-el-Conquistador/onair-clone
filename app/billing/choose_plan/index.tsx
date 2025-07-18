"use client";

import dynamic from "next/dynamic";

import "@/styles/billing/billing.scss";
import "@/styles/billing/plans.scss";
import Link from "next/link";
import { useMemo, useState } from "react";
import { type Plan } from "@/lib/types/billing";

const SlButton = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/button/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);

const SlDialog = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/dialog/index.js"),
  {
    loading: () => <>Loading...</>,
    ssr: false,
  }
);

const SlIcon = dynamic(
  // Notice how we use the full path to the component. If you only do `import("@shoelace-style/shoelace/dist/react")` you will load the entire component library and not get tree shaking.
  () => import("@shoelace-style/shoelace/dist/react/icon/index.js"),
  {
    //   loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
type PageProps = {
  plans: Plan[];
  createSubscriptionSessionAction: (
    planId: string
  ) => Promise<string | Error>;
};
function ChoosePlan(props: PageProps) {
  const [plans, setPlans] = useState(props.plans);

  const [billingPeriod, setBillingPeriod] = useState("monthly");

  const isDisabled = useMemo(() => {
    return (
      props.plans.findIndex((el) => el.active) ==
        plans.findIndex((el) => el.active) ||
      plans.findIndex((el) => el.active) == -1
    );
  }, [props.plans, plans]);





  return (
    <div className="p-6">
      <div className="bg-white p-6">
        <div id="plans">
          <div>
            <div className="mb-6 border-b border-gray-200">
              <div className="flex items-center justify-between flex-wrap sm:flex-nowrap">
                <h3 className="text-2xl text-gray-900 pb-4">
                  Billing<span className="text-gray-400 ml-2"></span>
                </h3>
              </div>{" "}
              <nav className="-mb-px flex overflow-y-scroll remove-scroll">
                <Link
                  href="/billing/choose_plan"
                  className="
							whitespace-nowrap py-4 px-2 sm:px-6 border-b-2 border-transparent font-medium text-sm focus:outline-none
							hover:text-blue-500 hover:border-blue-300
							text-blue-500 border-blue-300 
						"
                >
                  Standard
                </Link>{" "}
                {/*}  <a
                  href="/billing/choose_plan/enterprise"
                  className="
							whitespace-nowrap py-4 px-2 sm:px-6 border-b-2 border-transparent font-medium text-sm focus:outline-none
							hover:text-blue-500 hover:border-blue-300
							text-gray-500 
						"
                >
                  Enterprise
                </a>*/}
              </nav>
            </div>
          </div>{" "}
          <div className="flex justify-center mt-8">
            <div className="flex w-40 bg-gray-100 rounded-md">
              <button
                className={`btn text-gray-700 rounded-r-none w-1/2  text-white ${
                  billingPeriod == "monthly" && "!btn-brand"
                }`}
                onClick={() => {
                  setBillingPeriod("monthly");
                }}
              >
                Monthly
              </button>{" "}
              {/*}  <button
                className={`btn text-gray-700 rounded-l-none w-1/2 ${
                  billingPeriod == "yearly" && "!btn-brand"
                }`}
                onClick={() => {
                  setBillingPeriod("yearly");
                }}
              >
                Yearly
              </button>*/}
            </div>
          </div>{" "}
          {billingPeriod == "monthly" ? (
            <form
              onSubmit={async (event) => {
                event?.preventDefault();
            
                const plan = plans.filter((el) => el.active)[0];

                const response = await props.createSubscriptionSessionAction(
                  plan.priceTestId
                );
                const sessionUrl =
                  response instanceof Error || response == null
                    ? null
                    : response;

              
                if (sessionUrl) {
                 window.open(sessionUrl);
                }
              }}
            >
              {plans.map((plan: Plan) => (
                <div key={plan.priceId}>
                  <label className={`plan ${plan.active && "border-blue-700"}`}>
                    <div className="flex md:flex-col justify-between col-span-2">
                      <input
                        hidden
                        name="plan"
                        type="radio"
                        value="basic-9"
                        onClick={() => {
                          setPlans((prevState) =>
                            prevState.map((el) => {
                              if (el.priceId == plan.priceId) {
                                return {
                                  ...el,
                                  active: true,
                                };
                              }
                              return {
                                ...el,
                                active: false,
                              };
                            })
                          );
                        }}
                      />{" "}
                      <div>
                        <h4 className="mb-2">{plan.name}</h4>{" "}
                        <span className="mb-2"></span>
                      </div>{" "}
                      <div className="md:mt-0 -mt-1">
                        <span className="text-2xl font-bold tracking-tight">
                          {plan.price}
                          <small className="text-base font-medium">
                            /month
                          </small>{" "}
                        </span>
                      </div>
                    </div>{" "}
                    <div id="plan-limits" className="col-start-4">
                      {plan.features.map((feature) => (
                        <li className="plan-feature" key={feature}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            className="plan-feature-svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span> {feature}</span>
                        </li>
                      ))}
                    </div>
                  </label>
                </div>
              ))}

              {/*<div className="text-sm -mt-2">
              <a href="https://ShopLine.io/pricing" target="_blank">
                Compare Plans
              </a>
            </div>{" "}
            <div>
              <h3 className="mt-12 border-b border-gray-300 text-2xl">
                Quantity
              </h3>{" "}
              <div className="mt-4 font-semibold">How many licenses?</div>{" "}
              <input
                type="number"
                min="1"
                max="100"
                className="w-56 sm:text-sm"
              />{" "}
              <span className="text-gray-400 text-sm">
                Purchase one additional license for each organization member you
                intend to invite
              </span>
            </div>{" "}
            <div id="summary" className="mt-12">
              <h3 className="border-b border-gray-300 text-2xl">Summary</h3>{" "}
              <div className="md:flex justify-between md:w-2/6">
                <div className="md:w-1/2">
                  <div className="pt-4 font-semibold">Current Plan</div>{" "}
                  <div>Basic Plan</div> <div>Quantity: 1</div>{" "}
                  <div>Fees: trial </div>
                </div>{" "}
                <div className="md:w-1/2">
                  <div className="pt-4 font-semibold">New Plan</div>{" "}
                  <div>Basic Plan</div> <div>Quantity: 1</div>{" "}
                  <div>Fees: $9 /month </div>
                </div>
              </div>
            </div>{" "}*/}
              <div className="py-4 mt-12 flex items-center justify-center">
                {" "}
                <input
                  type="submit"
                  value="Subscribe"
                  className={`inline text-white border border-transparent rounded-md px-4 py-2 cursor-pointer ${
                    !isDisabled && "bg-blue-500"
                  }`}
                  disabled={isDisabled}
                />
              </div>
            </form>
          ) : (
            <form>
              <div>
                <label className="plan">
                  <div className="flex md:flex-col justify-between col-span-2">
                    <input hidden name="plan" type="radio" value="basic-90" />{" "}
                    <div>
                      <h4 className="mb-2">Basic Plan</h4>{" "}
                      <span className="mb-2"></span>
                    </div>{" "}
                    <div className="md:mt-0 -mt-1">
                      <span className="text-2xl font-bold tracking-tight">
                        $90
                        <small className="text-base font-medium">
                          /year
                        </small>{" "}
                      </span>
                    </div>
                  </div>{" "}
                  <div id="plan-limits" className="col-start-4">
                    <li className="plan-feature">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="plan-feature-svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        ></path>
                      </svg>{" "}
                      <span>10 Links</span>
                    </li>
                    <li className="plan-feature">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="plan-feature-svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        ></path>
                      </svg>{" "}
                      <span>3 Integrations</span>
                    </li>
                    <li className="plan-feature">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="plan-feature-svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        ></path>
                      </svg>{" "}
                      <span>1,000 Minutes/month</span>
                    </li>
                    <li className="plan-feature">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="plan-feature-svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        ></path>
                      </svg>{" "}
                      <span>Recording</span>
                    </li>
                  </div>
                </label>
              </div>
              <div>
                <label className="plan">
                  <div className="flex md:flex-col justify-between col-span-2">
                    <input
                      hidden
                      name="plan"
                      type="radio"
                      value="professional-190"
                    />{" "}
                    <div>
                      <h4 className="mb-2">Professional Plan</h4>{" "}
                      <span className="mb-2"></span>
                    </div>{" "}
                    <div className="md:mt-0 -mt-1">
                      <span className="text-2xl font-bold tracking-tight">
                        $190
                        <small className="text-base font-medium">
                          /year
                        </small>{" "}
                      </span>
                    </div>
                  </div>{" "}
                  <div id="plan-limits" className="col-start-4">
                    <li className="plan-feature">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="plan-feature-svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        ></path>
                      </svg>{" "}
                      <span>20 Links</span>
                    </li>
                    <li className="plan-feature">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="plan-feature-svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        ></path>
                      </svg>{" "}
                      <span>6 Integrations</span>
                    </li>
                    <li className="plan-feature">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="plan-feature-svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        ></path>
                      </svg>{" "}
                      <span>2,000 Minutes/month</span>
                    </li>
                    <li className="plan-feature">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="plan-feature-svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        ></path>
                      </svg>{" "}
                      <span>Recording, transcribing</span>
                    </li>
                  </div>
                </label>
              </div>
              <div>
                <label className="plan">
                  <div className="flex md:flex-col justify-between col-span-2">
                    <input
                      hidden
                      name="plan"
                      type="radio"
                      value="business-490"
                    />{" "}
                    <div>
                      <h4 className="mb-2">Business Plan</h4>{" "}
                      <span className="mb-2"></span>
                    </div>{" "}
                    <div className="md:mt-0 -mt-1">
                      <span className="text-2xl font-bold tracking-tight">
                        $490
                        <small className="text-base font-medium">
                          /year
                        </small>{" "}
                      </span>
                    </div>
                  </div>{" "}
                  <div id="plan-limits" className="col-start-4">
                    <li className="plan-feature">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="plan-feature-svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        ></path>
                      </svg>{" "}
                      <span>50 Links</span>
                    </li>
                    <li className="plan-feature">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="plan-feature-svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        ></path>
                      </svg>{" "}
                      <span>15 Integrations</span>
                    </li>
                    <li className="plan-feature">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="plan-feature-svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        ></path>
                      </svg>{" "}
                      <span>5,000 Minutes/month</span>
                    </li>
                    <li className="plan-feature">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="plan-feature-svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        ></path>
                      </svg>{" "}
                      <span>Recording, transcribing</span>
                    </li>
                  </div>
                </label>
              </div>{" "}
              {/*} <div className="text-sm -mt-2">
              <a href="https://ShopLine.io/pricing" target="_blank">
                Compare Plans
              </a>
            </div>{" "}
            <div>
              <h3 className="mt-12 border-b border-gray-300 text-2xl">
                Quantity
              </h3>{" "}
              <div className="mt-4 font-semibold">How many licenses?</div>{" "}
              <input
                type="number"
                min="1"
                max="100"
                className="w-56 sm:text-sm"
              />{" "}
              <span className="text-gray-400 text-sm">
                Purchase one additional license for each organization member you
                intend to invite
              </span>
            </div>{" "}
            <div id="summary" className="mt-12">
              <h3 className="border-b border-gray-300 text-2xl">Summary</h3>{" "}
              <div className="md:flex justify-between md:w-2/6">
                <div className="md:w-1/2">
                  <div className="pt-4 font-semibold">Current Plan</div>{" "}
                  <div>Basic Plan</div> <div>Quantity: 1</div>{" "}
                  <div>Fees: trial </div>
                </div>{" "}
                <div className="md:w-1/2">
                  <div className="pt-4 font-semibold">New Plan</div>{" "}
                  <div>Basic Plan</div> <div>Quantity: 1</div>{" "}
                  <div>Fees: $90 /year </div>
                </div>
              </div>
            </div>{" "}*/}
              <div className="py-4 mt-12 flex items-center justify-center">
                {" "}
                <input
                  type="submit"
                  value="Subscribe"
                  className="inline text-white bg-blue-500 border border-transparent rounded-md px-4 py-2 cursor-pointer"
                />{" "}
              </div>
            </form>
          )}
          <SlDialog
            label="Unable to Subscribe"
            className="with-header"
            style={{ width: "500px" }}
          >
            <div className="text-gray-600"></div>{" "}
            <div className="flex justify-center mt-8">
              <SlButton
                slot="footer"
                variant="primary"
                size="medium"
                data-optional=""
                data-valid=""
              >
                Close
              </SlButton>
            </div>
          </SlDialog>
        </div>
      </div>
    </div>
  );
}

export default ChoosePlan;
