import { forwardRef, type ReactNode } from "react";

import "@/styles/Dropdown/select.scss";

interface Option {
  label: string;
  value: string;
}

const Select = forwardRef(function Select(
  {
    label,
    children,
    options,
  }: {
    label: string;
    children: ReactNode;
    options: Option[];
  },
  ref: React.ForwardedRef<HTMLSelectElement>
) {
  return (
    <div className="flex  justify-center items-center select">
      {children}
      <select defaultValue={label} ref={ref}>
        <option value={label} disabled hidden>
          {label}
        </option>
        {options.map(({ value, label }, i) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
