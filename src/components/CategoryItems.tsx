import { Link } from "react-router-dom";
import { Gamepad2, Laptop, AudioLines, Smartphone } from "lucide-react";
import Card from "./Card";

interface CategoryItemProps {
    category: string;
    icon: string;
}

export default function CategoryItem({ category, icon }: CategoryItemProps) {
    return (
        <Link to={`/products?category=${category}`}>
            <Card>
                <div className="p-6 text-center space-y-2">
                    <div
                        className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors"
                    >
                        {icon === "Gamepad2" && <Gamepad2 className="w-8 h-8 text-primary" />}
                        {icon === "Laptop" && <Laptop className="w-8 h-8 text-primary" />}
                        {icon === "AudioLines" && <AudioLines className="w-8 h-8 text-primary" />}
                        {icon === "Smartphone" && <Smartphone className="w-8 h-8 text-primary" />}
                    </div>

                    <h3 className="font-semibold text-lg">{category}</h3>
                </div>
            </Card>
        </Link>
    )
}