import Button from "../components/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl text-gray-700 mt-4">Página no encontrada 😢</p>
      <Button to="/" className="mt-6">Volver al inicio</Button>
    </div>
  );
}
