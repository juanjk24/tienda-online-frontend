import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Home, Package, Grid3X3, PackageSearch } from "lucide-react";
import { useState } from "react";
import AuthButton from "../components/AuthButton";
import useAuthStore from "../store/auth";

const navigation = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Productos", href: "/products", icon: Package },
  { name: "Categorías", href: "/categories", icon: Grid3X3 },
  { name: "Carrito", href: "/cart", icon: ShoppingCart },
  { name: "Pedidos", href: "/orders", icon: PackageSearch },

];

export default function Header() {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link className="flex items-center space-x-2" to="/" onClick={closeMobileMenu}>
            <span className="text-xl md:text-2xl font-bold tracking-tight">
              tienda online
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary hover:underline relative ${
                  pathname === item.href ? 'text-primary underline' : ''
                }`}
                to={item.href}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          {pathname !== "/login" && (
            <div className="hidden md:flex items-center">
              <AuthButton isAuthenticated={isAuthenticated} />
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-sm hover:bg-accent transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-4 space-y-4">
              {/* Navigation Links */}
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    className={`flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-accent rounded-sm relative ${
                      pathname === item.href ? 'text-primary bg-muted' : 'text-foreground'
                    }`}
                    to={item.href}
                    onClick={closeMobileMenu}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile Auth Section */}
              {pathname !== "/login" && (
                <div className="pt-4 border-t border-border">
                  <div className="px-4">
                    <AuthButton isAuthenticated={isAuthenticated} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
