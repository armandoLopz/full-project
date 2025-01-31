<template>
  <AppBar title="Crear cuenta" /> <br /> <br />
  <v-card class="mx-auto pa-12 pb-8 rounded-lg" elevation="8" max-width="448">
    <router-link to="/">
      <v-card-title class="text-center">
        <span class="headline">Valencia Sabe Registro</span>
      </v-card-title>
    </router-link>

    <v-sheet class="mx-auto" width="300">
      <v-form ref="form" v-model="isValid">
        <!-- Campo de Username -->
        <v-text-field v-model="username" :counter="3" :rules="usernameRules" label="Username" required></v-text-field>

        <!-- Campo de First Name -->
        <v-text-field v-model="first_name" :counter="3" :rules="firstNameRules" label="Nombre" required></v-text-field>

        <!-- Campo de Last Name -->
        <v-text-field v-model="last_name" :counter="3" :rules="lastNameRules" label="Apellido" required></v-text-field>

        <!-- Campo de Correo -->
        <v-text-field v-model="email" :rules="emailRules" label="Correo electrónico" required></v-text-field>

        <!-- Campo de Contraseña -->
        <v-text-field v-model="password" :type="passwordVisible ? 'text' : 'password'"
          :append-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'" :rules="passwordRules" label="Contraseña" required
          @click:append="passwordVisible = !passwordVisible"></v-text-field>

        <!-- Mensaje de error -->
        <v-alert v-if="errorMessage" type="error" class="mt-4" dismissible>
          {{ errorMessage }}
        </v-alert>

        <!-- Mensaje de éxito -->
        <v-alert v-if="successMessage" type="success" class="mt-4" dismissible>
          {{ successMessage }}
        </v-alert>

        <div class="d-flex flex-column">
          <!-- Botón Registrarse con animación y color más vivo -->
          <v-btn class="mt-4 animated-btn" :style="{ backgroundColor: '#FF7043', color: '#FFFFFF' }" block
            @click="validate">
            Registrarse
          </v-btn>

          <!-- Botón Resetear Formulario con un gris más vibrante -->
          <v-btn class="mt-4 animated-btn" :style="{ backgroundColor: '#616161', color: '#FFFFFF' }" block
            @click="reset">
            Resetear Formulario
          </v-btn>

          <!-- Botón Ya tengo cuenta con azul más vivo -->
          <router-link to="/login">
            <v-btn class="mt-4 animated-btn" :style="{ backgroundColor: '#42A5F5', color: '#FFFFFF' }" block>
              Ya tengo cuenta
            </v-btn>
          </router-link>
        </div>
      </v-form>
    </v-sheet>
  </v-card>
  <br /> <br />
</template>

<script>
import apiService from "@/services/apiService"; // Importamos el servicio API

export default {
  data() {
    return {
      username: "", // Username
      first_name: "", // Nombre
      last_name: "", // Apellido
      email: "", // Correo
      password: "", // Contraseña
      passwordVisible: false, // Visibilidad de la contraseña
      isValid: false, // Estado de validación del formulario
      errorMessage: null, // Mensaje de error
      successMessage: null, // Mensaje de éxito

      // Reglas de validación
      usernameRules: [
        (v) => !!v || "El username es obligatorio",
        (v) =>
          (v && v.length >= 3) || "El username debe tener al menos 3 caracteres",
      ],
      firstNameRules: [
        (v) => !!v || "El nombre es obligatorio",
        (v) =>
          (v && v.length >= 3) || "El nombre debe tener al menos 3 caracteres",
      ],
      lastNameRules: [
        (v) => !!v || "El apellido es obligatorio",
        (v) =>
          (v && v.length >= 3) || "El apellido debe tener al menos 3 caracteres",
      ],
      emailRules: [
        (v) => !!v || "El correo es obligatorio",
        (v) => /.+@.+\..+/.test(v) || "Debe ser un correo electrónico válido",
      ],
      passwordRules: [
        (v) => !!v || "La contraseña es obligatoria",
        (v) =>
          (v && v.length >= 5) ||
          "La contraseña debe tener al menos 5 caracteres",
      ],
    };
  },
  methods: {
    async validate() {
      if (this.$refs.form.validate()) {
        const userData = {
          username: this.username,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
        };

        this.errorMessage = null; // Limpiar mensaje de error

        try {
          // Llamada al servicio para registrar al usuario
          await apiService.createUser(userData);

          this.successMessage =
            "Usuario creado exitosamente. Redirigiendo al login...";

          // Redirigir después de un pequeño retraso
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        } catch (error) {
          console.error("Error al registrar el usuario:", error);
          this.errorMessage =
            "Hubo un error al registrar el usuario. Por favor, intenta nuevamente.";
        }
      } else {
        alert("Por favor, corrige los errores en el formulario.");
      }
    },
    reset() {
      this.$refs.form.reset();
      this.errorMessage = null;
      this.successMessage = null;
    },
  },
};
</script>

<style scoped>
/* Estilos comunes para animaciones */
.animated-btn {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.animated-btn:hover {
  transform: scale(1.05);
  /* Aumenta ligeramente el tamaño */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  /* Sombra suave */

  background-color: #FF5722;
}
</style>