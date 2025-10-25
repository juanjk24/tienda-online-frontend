import { Link } from "react-router-dom"
import { type ComponentProps } from "react"
import clsx from "clsx"

type ButtonProps = {
  to?: string
  size?: "sm" | "md" | "lg"
  outline?: boolean
} & ComponentProps<"button">

export default function Button({
  to,
  size = "md",
  outline,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded transition-colors"
  const colorStyles = outline ? "border border-border text-primary bg-transparent hover:bg-accent hover:text-background" : "bg-primary hover:bg-accent text-background"
  const sizeStyles =
    size === "sm"
      ? "px-2 py-1 text-sm"
      : size === "lg"
      ? "px-6 py-3 text-lg"
      : "px-4 py-2 text-sm"

  const classes = clsx(baseStyles, colorStyles, sizeStyles, className)

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
