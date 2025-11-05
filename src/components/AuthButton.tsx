import { useNavigate } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";
import Button from "./Button";
import { logout } from "../services/auth";
import useAuthStore from "../store/auth";
import { toast } from "sonner";

type AuthButtonProps = {
  isAuthenticated?: boolean;
};

export default function AuthButton({ isAuthenticated }: AuthButtonProps) {
  const zustandLogout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      zustandLogout();
      navigate("/");

      toast.success("Sesión cerrada exitosamente");

    } catch (error) {
        console.error("Logout Failed:", error);
        toast.error("Error al cerrar sesión. Inténtalo de nuevo.");
    }
  };

  if (isAuthenticated) {
    return (
      <Button className="bg-red-600 text-destructive-foreground hover:bg-red-600/80" onClick={handleLogout}>
        <LogOut className="h-4 w-4 mr-2" />
        Cerrar sesión
      </Button>
    );
  }

  return (
    <Button to="/login">
      <LogIn className="h-4 w-4 mr-2" />
      Iniciar sesión
    </Button>
  );
}
