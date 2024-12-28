import { ReactEventHandler, forwardRef, type ReactNode } from "react";

import "@/styles/Inputs/text.scss";

import { type ChangeEvent } from "react";

const TextInput = forwardRef(function TextInput(
  {
    label = "",
    children,
    placeholder = "",
    labelHidden = false,
    type = "text",
    defaultValue = "",
    disabled=false
  }: {
    label?: string;
    children: ReactNode;
    placeholder?: string;
    labelHidden?: boolean;
    type?: "text" | "password";
    change?: (value: string) => void;
    defaultValue?: string;
    disabled?:boolean
  },
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="flex justify-center items-center text">
      <input
        type={type} //password vs text
        id={label}
        placeholder={placeholder}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          //change(event.target.value);
        }}
        defaultValue={defaultValue}
        ref={ref}
        disabled={disabled}
      />
      <label htmlFor={label} hidden={labelHidden}>
        {label}
      </label>
      {children}
    </div>
  );
});

export default TextInput;
