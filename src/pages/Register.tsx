import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import Button from "../components/Button";
import Card from "../components/Card";
import InputText from "../components/InputText";
import { register } from "../services/auth";
import useAuthStore from "../store/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const zustandLogin = useAuthStore((state) => state.login);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    setIsLoading(true);

    try {
      const firebaseUser = await register(email, password);

      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
      };

      zustandLogin(userData);

      toast.success("Registro exitoso");
      navigate("/");
    } catch (err: any) {
      console.error("Registro Fallido:", err.message);

      let errorMessage = "Error al registrar. Verifica tus credenciales.";

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col mx-auto">
      <div className="container mx-auto px-4 py-12">
        <Card>
          <h1 className="text-4xl font-bold tracking-tight text-center mb-2">
            Registrarse
          </h1>
          <p className="text-muted-foreground text-center">
            Ingresa tus credenciales para crear una cuenta
          </p>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mt-6">
              <InputText
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                label="Correo electrónico"
                type="email"
                placeholder="Ingresa tu correo electrónico"
                autoComplete="email"
                required
              />

              <InputText
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                label="Contraseña"
                type="password"
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
                required
              />
            </div>

            <div className="mt-6">
              <Button className="w-full disabled:opacity-70 disabled:cursor-not-allowed" type="submit" disabled={isLoading}>
                <LogIn className="mr-2 h-4 w-4" />
                {
                  isLoading ? "Registrando..." : "Registrarse"
                }
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link
                className="text-primary hover:underline font-medium"
                to="/login"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
