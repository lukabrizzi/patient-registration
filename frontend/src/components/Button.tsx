import React, { FC } from "react";

interface ButtonProps {
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  type = "button",
  onClick,
  children,
  ariaLabel,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition duration-200 ${className}`}
      aria-label={ariaLabel}
      style={{ width: "max-content" }}
    >
      {children}
    </button>
  );
};

export default Button;
