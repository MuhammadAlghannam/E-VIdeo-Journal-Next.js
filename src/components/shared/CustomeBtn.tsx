import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

// Combine ButtonHTMLAttributes with LinkProps, excluding conflicting properties
interface CustomeBtnProps {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function CustomeBtn({
  children,
  href,
  type = "button",
  variant = "default",
  size = "default",
  className = "",
  onClick,
  disabled = false,
  ...props
}: CustomeBtnProps) {
  const baseStyles = "text-h7-semibold text-white hover:text-hover hover:text-white cursor-pointer py-5 px-6 transition-all duration-200";

  return href && !disabled ? (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant, size }),
        baseStyles,
        className
      )}
      {...props}
    >
      {children}
    </Link>
  ) : (
    <Button
      type={type}
      variant={variant}
      size={size}
      className={cn(baseStyles, className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
}