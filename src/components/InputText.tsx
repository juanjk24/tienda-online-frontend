import { type ComponentProps } from "react"

type InputTextProps = {
    id: string;
    name?: string;
    label: string;
    type: "text" | "email" | "password" | "number";
    placeholder: string;
} & ComponentProps<"input">;

export default function InputText({ id, name, label, type, placeholder, ...props }: InputTextProps) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium mb-1">
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                className="w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={placeholder}
                {...props}
            />
        </div>
    );
}
