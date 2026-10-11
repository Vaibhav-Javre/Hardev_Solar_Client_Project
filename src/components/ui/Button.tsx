import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "solar" | "forest" | "navy" | "outline" | "white" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  isExternal = false,
  fullWidth = false,
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs sm:text-sm gap-1.5",
    md: "px-5 py-2.5 text-sm sm:text-base gap-2",
    lg: "px-6 py-3.5 text-base sm:text-lg gap-2.5 shadow-sm",
  };

  const variantStyles = {
    // Primary: Fresh emerald green with bright hover
    primary:
      "bg-[#16A34A] hover:bg-[#15803D] active:bg-[#14532D] text-white shadow-[#16A34A]/25 shadow-md hover:shadow-lg focus:ring-[#16A34A] border border-transparent",
    // Solar: Warm solar yellow with crisp forest slate text
    solar:
      "bg-[#FACC15] hover:bg-[#F59E0B] active:bg-[#D97706] text-[#0F291E] font-extrabold shadow-[#FACC15]/30 shadow-md hover:shadow-lg focus:ring-[#FACC15]",
    // Forest / Eco Green: Crisp green button
    forest:
      "bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] text-white shadow-[#16A34A]/25 shadow-md hover:shadow-lg focus:ring-[#16A34A]",
    navy:
      "bg-[#DCFCE7] hover:bg-[#BBF7D0] active:bg-[#86EFAC] text-[#15803D] font-extrabold shadow-xs focus:ring-[#16A34A] border border-[#BBF7D0]",
    // Outline: Light green border and crisp emerald text
    outline:
      "border-2 border-[#16A34A] hover:border-[#15803D] text-[#16A34A] hover:text-[#15803D] hover:bg-[#F0FDF4] focus:ring-[#16A34A] bg-transparent",
    // White card style with subtle light green border
    white:
      "bg-white hover:bg-[#F0FDF4] text-[#16A34A] border-2 border-[#DCFCE7] hover:border-[#86EFAC] shadow-sm hover:shadow-md focus:ring-white",
    ghost:
      "text-[#16A34A] hover:text-[#15803D] hover:bg-[#F0FDF4] focus:ring-[#16A34A] bg-transparent",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
