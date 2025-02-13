"use client";

import dynamic from "next/dynamic";



const SlDialog = dynamic(
  () => import("@shoelace-style/shoelace/dist/react/dialog/index.js"),
  {
    // loading: () => <>Loading...</>,
    ssr: false,
  }
);

type ComponentProps = {
  isOpen:boolean,
  subscriptionFeature:string,
  subscriptionPlan:string
  closeModal:() => void
};
function MaximumLimitReached(props: ComponentProps) {
  return (
    <SlDialog
      label=""
      className="dialog-overview"
      open={props.isOpen}
      onSlAfterHide={() => {
        props.closeModal();
      }}
    >
      <div className="flex flex-col items-center">
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="#2ecc71"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          id=""
          className="w-16 h-16"
          style={{ display: "inline-block" }}
        >
          <use xlinkHref="/feather-sprite.svg#coffee"></use>
        </svg>{" "}
        <div className="text-center pb-4">
          <div className="text-xl mt-4 text-black font-bold">
            Maximum limit reached
          </div>{" "}
          <div className="mt-2 text-md leading-relaxed">
            <p>
              You have reached to the maximum limit of{" "}
              <b>{props.subscriptionFeature}</b>.<br />
            </p>
            You are currently subscribed to <b>{props.subscriptionPlan}</b>{" "}
            plan.
            <br />
            See{" "}
            <a href="/billing/choose_plan">
              billing plans
            </a>{" "}
            page for more information.
          </div>
        </div>
      </div>
    </SlDialog>
  );
}

export default MaximumLimitReached;
