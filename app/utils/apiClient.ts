import axios, { AxiosError, AxiosResponse } from "axios";

// Types
interface User {
  id: string;
  email?: string;
  role?: string;
}

interface ApiError {
  message: string;
  status?: number;
}

// Função para pegar o user do localStorage
function getUserFromLocalStorage(): User | null {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("supabase.auth.user");
    return user ? JSON.parse(user) : null;
  }
  return null;
}

// Função para pegar o token do localStorage
function getTokenFromLocalStorage(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("supabase.auth.token");
  }
  return null;
}

// Configuração base do axios
const baseConfig = {
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
};

// Requisição pública (não envia user)
export const publicRequest = axios.create(baseConfig);

// Requisição privada (envia user no header)
export const privateRequest = axios.create(baseConfig);

// Interceptor de requisição para privateRequest
privateRequest.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage();
    const token = getTokenFromLocalStorage();

    if (user) {
      config.headers["x-user"] = JSON.stringify(user);
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de resposta para ambos os clients
const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

const errorInterceptor = (error: AxiosError<ApiError>) => {
  if (error.response) {
    // O servidor respondeu com um status de erro
    const status = error.response.status;
    const message = error.response.data?.message || "An error occurred";

    // Tratamento específico para diferentes códigos de status
    switch (status) {
      case 401:
        // Não autorizado - redirecionar para login
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        break;
      case 403:
        // Proibido - usuário não tem permissão
        console.error("Access forbidden:", message);
        break;
      case 404:
        // Não encontrado
        console.error("Resource not found:", message);
        break;
      case 500:
        // Erro interno do servidor
        console.error("Server error:", message);
        break;
      default:
        console.error(`Error ${status}:`, message);
    }

    return Promise.reject({
      message,
      status,
    });
  } else if (error.request) {
    // A requisição foi feita mas não houve resposta
    return Promise.reject({
      message: "No response from server",
      status: 0,
    });
  } else {
    // Erro na configuração da requisição
    return Promise.reject({
      message: error.message,
      status: 0,
    });
  }
};

// Aplicar interceptors
publicRequest.interceptors.response.use(responseInterceptor, errorInterceptor);
privateRequest.interceptors.response.use(responseInterceptor, errorInterceptor);

// Funções auxiliares para requisições comuns
export const api = {
  // GET request
  get: async <T>(url: string, config = {}) => {
    const response = await publicRequest.get<T>(url, config);
    return response.data;
  },

  // POST request
  post: async <T>(url: string, data: any, config = {}) => {
    const response = await privateRequest.post<T>(url, data, config);
    return response.data;
  },

  // PUT request
  put: async <T>(url: string, data: any, config = {}) => {
    const response = await privateRequest.put<T>(url, data, config);
    return response.data;
  },

  // DELETE request
  delete: async <T>(url: string, config = {}) => {
    const response = await privateRequest.delete<T>(url, config);
    return response.data;
  },

  // PATCH request
  patch: async <T>(url: string, data: any, config = {}) => {
    const response = await privateRequest.patch<T>(url, data, config);
    return response.data;
  },
};
