import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Button from "./Button";
import { getUserToken } from "../services/auth";
import { createCategory } from "@/services/categories";

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCategoryAdded?: () => void;
}

interface CategoryFormData {
  name: string;
  icon: string;
}

export default function AddCategoryDialog({
  open,
  onOpenChange,
  onCategoryAdded,
}: AddCategoryDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formDataCategory, setFormData] = useState<CategoryFormData>({
    name: "",
    icon: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formDataCategory.name.trim() || !formDataCategory.icon.trim()) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    

    setIsLoading(true);

    try {
      const token = await getUserToken();

      if (!token) {
        toast.error("No estás autenticado");
        return;
      }

      // Preparar datos para enviar
      const categoryData = {
        name: formDataCategory.name.trim(),
        icon: formDataCategory.icon.trim(),
      };

      // Llamar a la API      
      await createCategory(categoryData, token);

      toast.success("Categoria creada exitosamente");

      // Resetear formulario
      setFormData({
        name: "",
        icon: "",
      });

      // Cerrar diálogo
      onOpenChange(false);

      // Notificar que se agregó una categoría
      onCategoryAdded?.();
    } catch (error: any) {
      console.error("Error al crear la categoría:", error);
      toast.error(error.message || "Error al crear la categoría");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agregar Nueva Categoría</DialogTitle>
          <DialogDescription>
            Complete el formulario para agregar una nueva categoría a la tienda.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Nombre de la Categoría <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formDataCategory.name}
              onChange={handleChange}
              placeholder="Ej: Electrónica"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icono de la Categoría <span className="text-destructive">*</span></Label>
            <Input
              id="icon"
              name="icon"
              value={formDataCategory.icon}
              onChange={handleChange}
              placeholder="Ej: ArrowRight"
              required
            />
            <p>Utiliza los nombres de lucide-react</p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              outline
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creando..." : "Crear Categoría"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
