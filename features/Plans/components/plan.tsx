import RadioInput from "@/components/Inputs/radio";

import "@/styles/plans/plan.scss";

function Plan({
  name,
  price,
  period,
  active,
  toggleCheckoutForm,
  toggleModal,
  subscribed,
}: {
  name: string;
  price: string;
  active: boolean;
  period: string;
  toggleCheckoutForm: () => void;
  toggleModal: () => void;
  subscribed: boolean;
}) {
  return (
    <div className="plan flex flex-col justify-center">
      <RadioInput
        id={name}
        name="plan"
        click={subscribed ? toggleModal : toggleCheckoutForm}
        checked={subscribed}
      >
        <div
          className="flex justify-between items-center w-full"
          style={{ height: "100px" }}
        >
          <div className="flex flex-col gap-3 items-start w-full">
            <p className="plan__name">
              {name}
              {subscribed && <span>Active</span>}
            </p>
            <p className="plan__period">{name}</p>
          </div>
          <div className="flex flex-col gap-3 items-end w-full">
            <p className="plan__price">{price}</p>
            <p className="plan__period">{period}</p>
          </div>
        </div>
      </RadioInput>
    </div>
  );
}

export default Plan;
