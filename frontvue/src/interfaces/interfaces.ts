 export interface User {
    id: number;
    username: string;
    email: string;
    // Otros campos del modelo User si es necesario
  }
  
  export interface ComentariosDb {
    id?: number; // Opcional para los objetos que aún no se han guardado
    user_fk: User; // Relación con el modelo User
    local_fk: LocalDb; // Relación con el modelo LocalDb
    calificacion: number; // Calificación numérica
    descripcion: string; // Descripción del comentario
  }
  
  export interface LocalDb {
    id?: number;
    tipo_comida: string; // Tipo de comida ofrecida
    calificacion: number; // Calificación del local
    nombre: string; // Nombre del local
    contacto: number; // Número de contacto del local
  }
  
  export interface ZonasDb {
    id?: number;
    local_fk: LocalDb; // Relación con el modelo LocalDb
    estado: string; // Estado donde se encuentra la zona
    ciudad: string; // Ciudad donde se encuentra la zona
    calle: string; // Calle donde se encuentra la zona
  }
  
  export interface EventoDb {
    id?: number;
    local_fk: LocalDb; // Relación con el modelo LocalDb
    zona: ZonasDb[]; // Relación de muchos a muchos con ZonasDb
    estado: string; // Estado donde se realiza el evento
    ciudad: string; // Ciudad donde se realiza el evento
    calle: string; // Calle donde se realiza el evento
  }

    export interface TokenResponse {
    access: string;
    refresh: string;
  }
  
  export interface RefreshTokenResponse {
    access: string;
  }
  
  