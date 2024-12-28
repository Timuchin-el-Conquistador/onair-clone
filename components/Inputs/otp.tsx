import "@/styles/Inputs/otp.scss";

import { forwardRef } from "react";

const OTPInput = forwardRef(function OTPInput(
  {
    id,
    name,
    next,
    previous,
    change,
  }: {
    id: string;
    name: string;
    next: string;
    previous: string;
    change: (value: string) => void;
  },
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="digit-group">
      <input
        type="text"
        id={id}
        name={name}
        data-next={next}
        data-previous={previous}
        maxLength={1}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          change(event.target.value);
        }}
        ref={ref}
      />
    </div>
  );
});

export default OTPInput;
