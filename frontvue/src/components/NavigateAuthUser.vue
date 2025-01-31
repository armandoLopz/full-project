<template>
  <VNavigationDrawer app permanent floating>
    <v-list>
      <!-- Inicio -->
      <router-link to="/" class="no-link">
        <v-list-item class="list-item-hover">
          <v-list-item-content>
            <v-list-item-title> <v-icon>mdi-home</v-icon> Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <br />

      <!-- Asociar restaurante -->
      <router-link to="/registrar-rest" class="no-link">
        <v-list-item class="list-item-hover">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon>mdi-account-group</v-icon> Asociar restaurante
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <br />

      <!-- Ver mis restaurantes -->
      <router-link to="/ver-restaurantes" class="no-link">
        <v-list-item class="list-item-hover">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon>mdi-store</v-icon> Ver mis restaurantes
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <br />

      <!-- Buscar restaurantes -->
      <router-link to="/buscar-rest" class="no-link">
        <v-list-item class="list-item-hover">
          <v-list-item-content>
            <v-list-item-title> <v-icon>mdi-magnify</v-icon> Buscar restaurantes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <br />

      <!-- Crear reseñas -->
      <router-link to="/registrar-resena" class="no-link">
        <v-list-item class="list-item-hover">
          <v-list-item-content>
            <v-list-item-title> <v-icon>mdi-note-edit</v-icon> Crear reseñas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <br />

      <!-- Ver reseñas -->
      <router-link to="/ver-resenas" class="no-link">
        <v-list-item class="list-item-hover">
          <v-list-item-content>
            <v-list-item-title> <v-icon>mdi-file-eye</v-icon> Ver reseñas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <br />

      <!-- Crear eventos -->
      <router-link to="/registrar-eventos" class="no-link">
        <v-list-item class="list-item-hover">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon>mdi-calendar-plus</v-icon> Crear eventos
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <br />

      <!-- Ver eventos -->
      <router-link to="/ver-eventos" class="no-link">
        <v-list-item class="list-item-hover">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon>mdi-eye</v-icon> Ver eventos
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
      <br />

      <!-- Cerrar sesión -->
      <router-link to="/" class="no-link" @click.native.prevent="logout">
        <v-list-item class="list-item-hover">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon>mdi-logout</v-icon> Cerrar sesión
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
    </v-list>
  </VNavigationDrawer>
</template>


<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function logout() {
  // Eliminar el token JWT (asumiendo que está en localStorage)
  localStorage.removeItem('token'); // Cambia 'token' según cómo lo guardes

  // Opcional: Eliminar el token de sessionStorage o cookies si lo usas
  sessionStorage.removeItem('token');
  document.cookie = "jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Refrescar la página actual
  location.reload();
}
</script>

<style scoped>
/* Estilo general para los enlaces */
.no-link {
  color: #FF7043;
  text-decoration: none;
}

/* Transición suave y animación al pasar el cursor */
.list-item-hover {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.list-item-hover:hover {
  background-color: #FFE0B2; /* Cambiar a un color de fondo suave */
  color: #BF360C; /* Cambiar el color del texto */
  border-radius: 5px; /* Redondear los bordes para darle un efecto más atractivo */
}

/* Estilo específico para el botón de cerrar sesión (opcional) */
.logout-button {
  cursor: pointer;
  font-weight: bold;
}
</style>
