
export default function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-card text-card-foreground flex flex-col rounded-xl border border-border p-6 shadow-sm group overflow-hidden h-full">
            {children}
        </div>
    )
}