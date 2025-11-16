import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "normal" | "success" | "danger";
  loading?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const variantClasses: Record<string, string> = {
  normal: "bg-blue-600 text-white hover:bg-blue-700",
  success: "bg-green-600 text-white hover:bg-green-700",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const Button: React.FC<ButtonProps> = ({
  variant = "normal",
  loading = false,
  disabled,
  children,
  className = "",
  onClick,
  ...rest
}) => {
  return (
    <button
      disabled={loading || disabled}
      onClick={(e) => {
        if (!loading && onClick) onClick(e);
      }}
      className={`
        px-4 py-2 rounded-lg font-medium text-sm md:text-base transition-all 
        flex items-center justify-center gap-2 w-full cursor-pointer
        ${variantClasses[variant]}
        ${loading || disabled ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
      {...rest}
    >
      {loading && (
        <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
      )}
      {children}
    </button>
  );
};

export default Button;
