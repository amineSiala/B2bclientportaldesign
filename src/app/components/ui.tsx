import React, { ButtonHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "premium";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC4F00] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white",
          {
            "bg-[#FC4F00] text-white hover:bg-[#E04500] shadow-sm hover:shadow-md": variant === "primary",
            "bg-[#f4e9da] text-[#212529] hover:bg-[#e8d6c0] border border-transparent hover:border-[#dcbfa3]": variant === "secondary",
            "border border-[#212529] bg-transparent hover:bg-[#212529] hover:text-white text-[#212529]": variant === "outline",
            "hover:bg-[#f4e9da] hover:text-[#212529] text-gray-600": variant === "ghost",
            "bg-[#212529] text-[#f4e9da] hover:bg-black shadow-md": variant === "premium",
            "bg-red-500 text-white hover:bg-red-600": variant === "danger",
            "h-9 px-3 text-sm": size === "sm",
            "h-10 py-2 px-4": size === "md",
            "h-12 px-8 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export const Badge = ({ children, variant = "default", className }: { children: React.ReactNode, variant?: "default"|"success"|"warning"|"danger"|"premium"|"destructive", className?: string }) => {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors", 
    {
      "bg-gray-100 text-gray-800": variant === "default",
      "bg-[#f4e9da] text-[#212529] border border-[#e8d6c0]": variant === "premium",
      "bg-green-100 text-green-800": variant === "success",
      "bg-orange-100 text-orange-800": variant === "warning",
      "bg-red-100 text-red-800": variant === "danger",
      "bg-red-100 text-red-800": variant === "destructive",
    }, className)}>
      {children}
    </span>
  )
}

export const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("rounded-xl border border-gray-200 bg-white text-[#212529] shadow-sm hover:shadow-md transition-shadow duration-300", className)}>
    {children}
  </div>
)