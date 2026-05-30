import axios from "axios";
import { getToken, clearToken } from "@/lib/auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  headers: { "Content-Type": "application/json" },
});

/**
 * Instância dedicada às páginas públicas (inscrição/presença). Sem injeção de
 * token e sem o interceptor de 401 da `api` — assim uma resposta de erro do
 * endpoint público apenas rejeita a promise (tratada com toast no formulário),
 * em vez de redirecionar o usuário para a tela de login.
 */
export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Sessão expirada/inválida: ao receber 401 em qualquer requisição, limpa o token
// e redireciona para a tela de login. Ignora o endpoint de login (que trata o 401
// de credenciais inválidas com toast próprio) e evita loop quando já está em "/".
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const isLoginRequest = error.config?.url?.includes("auth/login");
    if (status === 401 && !isLoginRequest && window.location.pathname !== "/") {
      clearToken();
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);
