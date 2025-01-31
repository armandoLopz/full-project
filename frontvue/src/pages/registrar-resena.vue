<template>
  <AppBar title="Reseñas" />
  <br /> <br />
  <v-card class="mx-auto pa-12 pb-8 rounded-lg" elevation="8" max-width="448">
    <router-link to="/">
      <v-card-title class="text-center">
        <span class="headline">Registro de reseñas</span>
      </v-card-title>
    </router-link>

    <v-sheet class="mx-auto" width="300">
      <v-form ref="form" v-model="isValid">

        <!-- Local -->
        <v-select
          v-model="form.local_fk"
          :items="locals"
          item-title="nombre"
          item-value="id"
          label="Local"
          required
          :rules="[v => !!v || 'Selecciona un local']"
        ></v-select>

        <!-- Calificación -->
        <v-rating
          v-model="form.calificacion"
          :length="5"
          label="Calificación"
          required
          :rules="[v => v > 0 || 'La calificación es obligatoria']"
        ></v-rating>

        <!-- Descripción -->
        <v-textarea
          v-model="form.descripcion"
          :rules="[v => !!v || 'La descripción es obligatoria']"
          label="Descripción"
          counter="200"
          required
        ></v-textarea>

        <!-- Mensaje de error -->
        <v-alert
          v-if="errorMessage"
          type="error"
          class="mt-4"
          dismissible
        >
          {{ errorMessage }}
        </v-alert>

        <!-- Mensaje de éxito -->
        <v-alert
          v-if="successMessage"
          type="success"
          class="mt-4"
          dismissible
        >
          {{ successMessage }}
        </v-alert>

        <div class="d-flex flex-column">
          <!-- Botón Registrar -->
          <v-btn
            class="mt-4"
            color="#E64A19"
            block
            @click="submitForm"
            :disabled="!isValid"
          >
            Registrar Comentario
          </v-btn>

          <!-- Botón Resetear -->
          <v-btn
            class="mt-4"
            color="error"
            block
            @click="resetForm"
          >
            Resetear Formulario
          </v-btn>

          <!-- Botón Volver -->
          <v-btn
            class="mt-4"
            block
            color="primary"
            @click="goBack"
          >
            Volver al Inicio
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </v-card>
  <br /> <br />
</template>

<script>
import apiService from "@/services/apiService";
import { jwtDecode } from "jwt-decode";

export default {
  data() {
    return {
      isValid: false,
      form: {
        local_fk: null,
        calificacion: null,
        descripcion: "",
        user_fk: null,
      },
      locals: [],
      errorMessage: null,
      successMessage: null,
    };
  },
  methods: {
    async fetchOptions() {
      try {
        const response = await apiService.getLocales();
        this.locals = response.data;
      } catch (error) {
        console.error("Error al obtener los locales:", error);
        this.errorMessage = "Hubo un problema al cargar los locales.";
      }
    },
    getUserIdFromJWT() {
      const token = localStorage.getItem('token'); 
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          return decodedToken.user_id; 
        } catch (error) {
          console.error("Error al decodificar el token:", error);
          this.errorMessage = "Error de autenticación. Por favor, inicie sesión nuevamente.";
        }
      }
      return null;
    },
    async submitForm() {
      if (this.$refs.form.validate()) {
        this.form.user_fk = this.getUserIdFromJWT();
        if (!this.form.user_fk) {
          this.errorMessage = "No se pudo obtener el ID del usuario. Por favor, inicie sesión nuevamente.";
          return;
        }

        try {
          const response = await fetch('http://127.0.0.1:8000/api/comentarios/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('jwt')}` 
            },
            body: JSON.stringify(this.form),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la respuesta del servidor');
          }

          const data = await response.json();
          this.successMessage = "Comentario registrado exitosamente.";
          
          // Redirigir después de 1 segundo
          setTimeout(() => {
            this.$router.push('/');
          }, 1000); // 1000 ms = 1 segundo
          
        } catch (error) {
          console.error("Error al enviar el comentario:", error);
          this.errorMessage = error.message || "Hubo un problema al registrar el comentario.";
        }
      }
    },
    resetForm() {
      this.$refs.form.reset();
      this.errorMessage = null;
      this.successMessage = null;
    },
    goBack() {
      this.$router.push('/');
    }
  },
  mounted() {
    this.fetchOptions();
  },
};
</script>
