import { FC } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const InputField: FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  required,
}) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      required={required}
      className="border rounded-sm p-1"
    />
    {error && (
      <span className="text-red-500 transition-opacity duration-300">
        {error}
      </span>
    )}
  </div>
);

export default InputField;
