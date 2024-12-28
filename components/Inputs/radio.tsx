"use client";

import "@/styles/Inputs/radio.scss";

function RadioInput({
  id,
  name,
  children,
  className,
  click,
  checked=false
}: {
  id: string;
  name: string;
  children: React.ReactNode;
  className?: string;
  click:()=>void,
  checked?:boolean
}) {
  return (
    <div className={`radio  ${className}`}>
      <input
        id={id}
        type="checkbox"
        className="radio__input"
        name={name}
        onChange={() => {
          click()
        }}
        checked={checked}
      />

      <label htmlFor={id} className="radio__label flex items-center">
        <span className="radio__label-button" />
        {children}
      </label>
    </div>
  );
}

export default RadioInput;
