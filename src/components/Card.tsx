import clsx from "clsx"

export default function Card({ children, className }: { children: React.ReactNode, className?: string }) {
    const classes = clsx(
        "bg-card text-card-foreground flex flex-col rounded-xl border border-border p-6 shadow-sm group overflow-hidden",
        className
    )
    return (
        <div className={classes}>
            {children}
        </div>
    )
}