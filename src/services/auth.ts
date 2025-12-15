import api from "./api";

export async function login(email: string, password: string) {
  const response = await api.post("/auth/login", { email, password });
  return response.data; // aquí podrías recibir un token o el usuario
}

export async function register(email: string, password: string) {
  const response = await api.post("/auth/register", { email, password });
  return response.data;
}

export async function logout() {
  // Si usas JWT, puedes simplemente borrar el token del localStorage
  localStorage.removeItem("token");
}