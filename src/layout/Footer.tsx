import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="border-t border-border bg-muted/30 mt-20">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">tienda online</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">Tu destino para productos de calidad en Colombia. Envíos seguros a todo el país.</p>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold">Comprar</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Todos los productos
                                </Link>
                            </li>
                            <li>
                                <Link to="/categories" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Categorías
                                </Link>
                            </li>
                            <li>
                                <Link to="/offers" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Ofertas
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold">Ayuda</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">Envíos</Link></li>
                            <li><Link to="/returns" className="text-muted-foreground hover:text-foreground transition-colors">Devoluciones</Link></li>
                            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contacto</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacidad</Link></li>
                            <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terminos</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} tienda online. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}