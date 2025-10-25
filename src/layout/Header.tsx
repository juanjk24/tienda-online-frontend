import { Link } from "react-router-dom"
import { Heart } from "lucide-react"
import { ShoppingCart } from "lucide-react"

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Productos', href: '/products' },
  { name: 'Categorías', href: '/categories' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
            <Link className="flex items-center space-x-2" to="/">
              <span className="text-2xl font-bold tracking-tight">tienda online</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => (
                    <Link 
                        key={item.name} 
                        className="text-sm font-medium transition-colors hover:text-primary hover:underline" 
                        to={item.href}
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>

            <div className="flex items-center gap-4">
                <Link to="/favorites" className="p-2 rounded-sm hover:bg-primary hover:text-background transition-colors">
                    <Heart className="h-5 w-5" />
                </Link>

                <Link to="/cart" className="p-2 rounded-sm hover:bg-primary hover:text-background transition-colors">
                    <ShoppingCart className="h-5 w-5" />
                </Link>
            </div>
        </div>
      </div>
    </header>
  );
}
