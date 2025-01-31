<template>
  <AppBar title="Iniciar sesión" /> <br /> <br />

  <div>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <router-link to="/">
        <v-card-title class="text-center">
          <span class="headline">Valencia Sabe inicio de sesión</span>
        </v-card-title>
      </router-link>

      <div class="text-subtitle-1 text-medium-emphasis">Cuenta</div>

      <!-- Campo de Nombre de Usuario -->
      <v-text-field
        v-model="username"
        density="compact"
        placeholder="Ingrese su nombre de usuario"
        prepend-inner-icon="mdi-account-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Contraseña
      </div>

      <!-- Campo de Contraseña -->
      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Ingrese su contraseña"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <!-- Mensaje de error -->
      <div v-if="errorMessage" class="text-center text-red-500 mt-2">
        <v-icon class="mr-2">mdi-alert-circle</v-icon>
        {{ errorMessage }}
      </div>

      <v-card class="mb-12" color="surface-variant" variant="tonal"></v-card>

      <!-- Botón para Iniciar Sesión -->
      <v-btn class="mb-8" color="white" size="large" variant="tonal" block @click="login">
        Iniciar sesión
      </v-btn>

      <v-card-text class="text-center">
        <router-link to="/registrar-user">
          <a class="text-white text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
            Registrarse <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import apiService from "@/services/apiService"; // Importamos el servicio API

export default {
  data() {
    return {
      username: "", // Almacenamos el nombre de usuario
      password: "", // Almacenamos la contraseña
      visible: false, // Controlar la visibilidad de la contraseña
      errorMessage: "", // Mensaje de error
    };
  },
  methods: {
    async login() {
      this.errorMessage = ""; // Limpiar mensaje de error

      const credentials = {
        username: this.username,
        password: this.password,
      };

      try {
        // Realizamos la solicitud de inicio de sesión usando el servicio
        const response = await apiService.login(credentials);

        // Si la respuesta es exitosa, guardamos el token y redirigimos
        localStorage.setItem("token", response.data.access); // Guarda el token JWT
        
        this.$router.push("/"); // Redirige al inicio

      } catch (error) {
        console.error("Login error:", error);
        this.errorMessage = "Los datos ingresados no son válidos"; // Mostrar mensaje de error
      }
    },
  },
};
</script>
