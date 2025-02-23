import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The variant of the badge which changes its color scheme.
   */
  variant?: "default" | "secondary" | "success" | "danger";
  children: React.ReactNode;
}

const baseClasses =
  "inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full";

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-gray-100 text-gray-800",
  secondary: "bg-blue-100 text-blue-800",
  success: "bg-green-100 text-green-800",
  danger: "bg-red-100 text-red-800",
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  children,
  className = "",
  ...props
}) => {
  const classes =
    `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};
