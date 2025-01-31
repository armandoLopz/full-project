<template>
  <VNavigationDrawer app permanent floating>
    <v-list>

      <router-link to="/" class="no-link">
        <v-list-item class="list-item-hover">
          <v-list-item-content>
            <v-list-item-title> <v-icon>mdi-home</v-icon> Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link> <br>

      <router-link to="/login" class="no-link">
        <v-list-item class="list-item-hover">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon>mdi-login</v-icon> Iniciar sesión
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link> <br>

      <router-link to="/registrar-user" class="no-link">
        <v-list-item class="list-item-hover">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon>mdi-account-plus</v-icon> Crear cuenta
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link> <br>

      <router-link to="/buscar-rest" class="no-link">
        <v-list-item class="list-item-hover">
          <v-list-item-content>
            <v-list-item-title> <v-icon>mdi-magnify</v-icon> Buscar establecimiento</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link> <br>

      <router-link to="/ver-resenas" class="no-link">
        <v-list-item class="list-item-hover">
          <v-list-item-content>
            <v-list-item-title> <v-icon>mdi-star</v-icon> Reseñas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link> <br>

      <router-link to="/ver-eventos" class="no-link">
        <v-list-item class="list-item-hover">
          <v-list-item-content>
            <v-list-item-title> <v-icon>mdi-calendar-text</v-icon> Eventos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>

    </v-list>
  </VNavigationDrawer>
</template>

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