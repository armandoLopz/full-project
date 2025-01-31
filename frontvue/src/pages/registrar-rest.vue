<template>
  <AppBar title="Registrar Local" /> <br /> <br />

  <!-- Formulario para Registrar Local y Dirección -->
  <v-card class="mx-auto pa-12 pb-8 rounded-lg" elevation="8" max-width="448">
    <router-link to="/">
      <v-card-title class="text-center">
        <span class="headline">Registre su local y la direccion</span>
      </v-card-title>
    </router-link>

    <v-sheet class="mx-auto" width="300">
      <v-form ref="formLocal" v-model="isValidLocal">
        <!-- Nombre del Local -->
        <v-text-field v-model="formLocal.localName" :counter="25"
          :rules="[v => !!v || 'El nombre del local es obligatorio']" label="Nombre del Local" required></v-text-field>

        <!-- Campo de contacto (Prefijo y Número) en dos columnas -->
        <v-row dense>
          <v-col cols="12">
            <v-select v-model="formLocal.contactPrefix" :items="['0424', '0414', '0426', '0412']" label="Código"
              required :rules="[v => !!v || 'El código de teléfono es obligatorio']"></v-select>
          </v-col>

          <v-col cols="12">
            <v-text-field v-model="formLocal.contactNumber" :counter="7"
              :rules="[v => /^[0-9]{7}$/.test(v) || 'Debe contener 7 dígitos']" label="Teléfono" type="number" required
              :maxlength="7" @input="limitPhoneNumber"></v-text-field>
          </v-col>
        </v-row>

        <!-- Tipo de Comida -->
        <v-select v-model="formLocal.foodType" :items="foodTypes" label="Tipo de Comida" required
          :rules="[v => !!v || 'Selecciona el tipo de comida']"></v-select>

        <!-- Dirección -->
        <v-text-field v-model="state" :rules="[() => !!state || 'Este campo es obligatorio']" label="Estado"
          placeholder="Ej: Estado Y" required></v-text-field>

        <v-text-field v-model="city" :rules="[() => !!city || 'Este campo es obligatorio']" label="Ciudad"
          placeholder="Ej: Ciudad X" required></v-text-field>

        <v-text-field v-model="address" :rules="[() => !!address || 'Este campo es obligatorio']" counter="25"
          label="Calle" placeholder="Ej: Calle 123" required></v-text-field>

        <v-alert v-if="errorMessage" type="error" class="mt-4" dismissible>
          {{ errorMessage }}
        </v-alert>

        <v-alert v-if="successMessage" type="success" class="mt-4" dismissible>
          {{ successMessage }}
        </v-alert>

        <!-- Botones de acción -->
        <div class="d-flex flex-column">
          <v-btn class="mt-4" color="#E64A19" block @click="submitForm" :disabled="!isValidLocal">
            Registrar Local y Dirección
          </v-btn>

          <!-- Botón Volver con color más vivo -->
          <router-link to="/">
            <v-btn class="mt-4" block color=primary>
              Volver al inicio
            </v-btn>
          </router-link>
        </div>
      </v-form>
    </v-sheet>
  </v-card> <br /> <br>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { jwtDecode } from "jwt-decode";

export default {
  data() {
    return {
      foodTypes: ['Italiana', 'Japonesa', 'Mexicana', 'Americana', 'Vegetariana', 'Vegana'],
      isValidLocal: false,
      formLocal: {
        localName: '',
        contactPrefix: '', // Para el código de teléfono
        contactNumber: '', // Para el número de teléfono
        foodType: '',
      },
      address: null,
      city: null,
      state: null,
      errorMessage: null,
      successMessage: null,
    };
  },

  methods: {
    async submitForm() {
      if (this.$refs.formLocal.validate()) {
        try {
          const token = localStorage.getItem("token");

          if (token) {
            try {
              const decodedToken = jwtDecode(token);

              const localData = {
                nombre: this.formLocal.localName,
                contacto: `${this.formLocal.contactPrefix}${this.formLocal.contactNumber}`, // Concatenar el código y número
                tipo_comida: this.formLocal.foodType,
                usuario: decodedToken.user_id
              };

              const headers = {
                Authorization: `Bearer ${token}`,
              };

              const localResponse = await axios.post("http://127.0.0.1:8000/api/locales/", localData, { headers });

              const addressData = {
                calle: this.address,
                ciudad: this.city,
                estado: this.state,
                local_fk: localResponse.data.id
              };

              const addressResponse = await axios.post("http://127.0.0.1:8000/api/zonas/", addressData, { headers });

              this.successMessage = 'Local y Dirección registrados exitosamente';

              // Redirigir al inicio después de un registro exitoso
              setTimeout(() => {
                this.$router.push('/');
                this.resetForm();
              }, 1000);

            } catch (error) {
              console.error("Error al decodificar el token:", error);
            }
          } else {
            console.error("No se encontró un token en localStorage");
          }
        } catch (error) {
          console.error("Error al registrar los datos:", error);
          this.errorMessage = 'Error al registrar el local o la dirección. Intenta de nuevo.';
        }
      }
    },

    // Limitar la cantidad de caracteres a 7 en el número de teléfono
    limitPhoneNumber() {
      if (this.formLocal.contactNumber.length > 7) {
        this.formLocal.contactNumber = this.formLocal.contactNumber.slice(0, 7);
      }
    },

    resetForm() {
      this.formLocal.localName = '';
      this.formLocal.contactPrefix = '';
      this.formLocal.contactNumber = '';
      this.formLocal.foodType = '';
      this.address = null;
      this.city = null;
      this.state = null;
      this.country = null;
    },
  },
};
</script>
