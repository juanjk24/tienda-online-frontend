import { Link, useNavigate } from "react-router-dom"
import { LogIn } from "lucide-react";
import Button from "../components/Button";
import Card from "../components/Card";
import InputText from "../components/InputText";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    toast.success("Inicio de sesión exitoso");
    navigate("/");
  }
  return (
    <div className="min-h-screen flex flex-col mx-auto">
      <div className="container mx-auto px-4 py-12">
        <Card>
          <h1 className="text-4xl font-bold tracking-tight text-center mb-2">
            Iniciar sesión
          </h1>
          <p className="text-muted-foreground text-center">
            Ingresa tus credenciales para acceder a tu cuenta
          </p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mt-6">
              <InputText
                id="email"
                label="Correo electrónico"
                type="email"
                placeholder="Ingresa tu correo electrónico"
                required
              />

              <InputText
                id="password"
                label="Contraseña"
                type="password"
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            <div className="mt-6">
              <Button className="w-full" type="submit">
                <LogIn className="mr-2 size-4" />
                Iniciar sesión
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link
                className="text-primary hover:underline font-medium"
                to="/register"
              >
                Regístrate aquí
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
