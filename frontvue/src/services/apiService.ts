import axios, { AxiosResponse } from "axios";
import {
  User,
  ComentariosDb as Comentario,
  LocalDb as Local,
  ZonasDb as Zona,
  EventoDb as Evento,
  TokenResponse,
  RefreshTokenResponse  
} from "@/interfaces/interfaces";

// Configuración base de Axios
const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// API Service
const apiService = {
  // Rutas para autenticación de tokens
  login(credentials: { username: string; password: string }): Promise<AxiosResponse<TokenResponse>> {
    return apiClient.post("token/", credentials);
  },
  refreshAccessToken(refreshToken: string): Promise<AxiosResponse<RefreshTokenResponse>> {
    return apiClient.post("token/refresh/", { refresh: refreshToken });
  },

  // Rutas para usuarios
  getUsers(): Promise<AxiosResponse<User[]>> {
    return apiClient.get("users/");
  },
  getUser(id: number): Promise<AxiosResponse<User>> {
    return apiClient.get(`users/${id}/`);
  },
  createUser(userData: User): Promise<AxiosResponse<User>> {
    return apiClient.post("users/", userData);
  },
  updateUser(id: number, userData: Partial<User>): Promise<AxiosResponse<User>> {
    return apiClient.put(`users/${id}/`, userData);
  },
  deleteUser(id: number): Promise<AxiosResponse<void>> {
    return apiClient.delete(`users/${id}/`);
  },

  // Rutas para comentarios
  getComentarios(): Promise<AxiosResponse<Comentario[]>> {
    return apiClient.get("comentarios/");
  },
  getComentario(id: number): Promise<AxiosResponse<Comentario>> {
    return apiClient.get(`comentarios/${id}/`);
  },
  createComentario(comentarioData: Comentario): Promise<AxiosResponse<Comentario>> {
    return apiClient.post("comentarios/", comentarioData);
  },
  updateComentario(
    id: number,
    comentarioData: Partial<Comentario>
  ): Promise<AxiosResponse<Comentario>> {
    return apiClient.put(`comentarios/${id}/`, comentarioData);
  },
  deleteComentario(id: number): Promise<AxiosResponse<void>> {
    return apiClient.delete(`comentarios/${id}/`);
  },

  // Rutas para zonas
  getZonas(): Promise<AxiosResponse<Zona[]>> {
    return apiClient.get("zonas/");
  },
  getZona(id: number): Promise<AxiosResponse<Zona>> {
    return apiClient.get(`zonas/${id}/`);
  },
  createZona(zonaData: Zona): Promise<AxiosResponse<Zona>> {
    return apiClient.post("zonas/", zonaData);
  },
  updateZona(id: number, zonaData: Partial<Zona>): Promise<AxiosResponse<Zona>> {
    return apiClient.put(`zonas/${id}/`, zonaData);
  },
  deleteZona(id: number): Promise<AxiosResponse<void>> {
    return apiClient.delete(`zonas/${id}/`);
  },

  // Rutas para locales
  getLocales(): Promise<AxiosResponse<Local[]>> {
    return apiClient.get("locales/");
  },
  getLocal(id: number): Promise<AxiosResponse<Local>> {
    return apiClient.get(`locales/${id}/`);
  },
  createLocal(localData: Local): Promise<AxiosResponse<Local>> {
    return apiClient.post("locales/", localData);
  },
  updateLocal(id: number, localData: Partial<Local>): Promise<AxiosResponse<Local>> {
    return apiClient.put(`locales/${id}/`, localData);
  },
  deleteLocal(id: number): Promise<AxiosResponse<void>> {
    return apiClient.delete(`locales/${id}/`);
  },

  // Rutas para eventos
  getEventos(): Promise<AxiosResponse<Evento[]>> {
    return apiClient.get("eventos/");
  },
  getEvento(id: number): Promise<AxiosResponse<Evento>> {
    return apiClient.get(`eventos/${id}/`);
  },
  createEvento(eventoData: Evento): Promise<AxiosResponse<Evento>> {
    return apiClient.post("eventos/", eventoData);
  },
  updateEvento(id: number, eventoData: Partial<Evento>): Promise<AxiosResponse<Evento>> {
    return apiClient.put(`eventos/${id}/`, eventoData);
  },
  deleteEvento(id: number): Promise<AxiosResponse<void>> {
    return apiClient.delete(`eventos/${id}/`);
  },
};

export default apiService;
