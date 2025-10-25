import { Link } from "react-router-dom"
import { type ComponentProps } from "react"
import clsx from "clsx"

type ButtonProps = {
  to?: string
  size?: "sm" | "md" | "lg"
} & ComponentProps<"button">

export default function Button({
  to,
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded transition-colors text-white"
  const colorStyles = "bg-primary hover:bg-accent"
  const sizeStyles =
    size === "sm"
      ? "px-2 py-1 text-sm"
      : size === "lg"
      ? "px-6 py-3 text-lg"
      : "px-4 py-2"

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
