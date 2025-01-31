<template>
  <AppBar title="Registrar Evento" /> <br /> <br />
  
  <v-card class="mx-auto pa-12 pb-8 rounded-lg" elevation="8" max-width="448">
    <router-link to="/">
      <v-card-title class="text-center">
        <span class="headline">Registre su Evento</span>
      </v-card-title>
    </router-link>

    <v-sheet class="mx-auto" width="300">
      <v-form ref="formEvento" v-model="isValidEvento">
        <!-- Nombre del Evento -->
        <v-text-field
          v-model="formEvento.eventName"
          :counter="120"
          :rules="[v => !!v || 'El nombre del evento es obligatorio']"
          label="Nombre del Evento"
          required
        ></v-text-field>

        <!-- Descripción del Evento -->
        <v-textarea
          v-model="formEvento.description"
          :counter="500"
          :rules="[v => !!v || 'La descripción del evento es obligatoria']"
          label="Descripción del Evento"
          required
        ></v-textarea>

        <!-- Selección de Restaurante -->
        <v-select
          v-model="selectedRestaurant"
          :items="restaurants"
          item-title="nombre"
          item-value="id"
          label="Seleccione un Restaurante"
          :rules="[v => !!v || 'Debe seleccionar un restaurante']"
          @update:model-value="loadLocations"
          required
        ></v-select>

        <!-- Selección de Localización -->
        <v-select
          v-model="selectedLocation"
          :items="formattedLocations"
          item-title="locationInfo"
          item-value="id"
          return-object
          label="Seleccione una Localización"
          :rules="[v => !!v || 'Debe seleccionar una localización']"
          :disabled="!selectedRestaurant"
          required
        >
          <template v-slot:selection="{ item }">
            {{ item.raw.locationInfo }}
          </template>
        </v-select>

        <v-alert v-if="errorMessage" type="error" class="mt-4" dismissible>
          {{ errorMessage }}
        </v-alert>

        <v-alert v-if="successMessage" type="success" class="mt-4" dismissible>
          {{ successMessage }}
        </v-alert>

        <!-- Botones de acción -->
        <div class="d-flex flex-column">
          <v-btn
            class="mt-4"
            color="#E64A19"
            block
            @click="submitForm"
            :disabled="!isValidEvento"
          >
            Registrar Evento
          </v-btn>

          <!-- Botón Volver -->
          <v-btn
            class="mt-4"
            color="primary"
            block
            @click="goBack"
          >
            Volver al inicio
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </v-card> <br> <br>
</template>

<script>
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default {
  data() {
    return {
      isValidEvento: false,
      formEvento: {
        eventName: "",
        description: "",
      },
      restaurants: [],
      locations: [],
      selectedRestaurant: null,
      selectedLocation: null,
      errorMessage: null,
      successMessage: null,
    };
  },

  computed: {
    formattedLocations() {
      return this.locations.map(location => ({
        ...location,
        locationInfo: `${location.estado}, ${location.ciudad}, ${location.calle}`
      }));
    }
  },

  mounted() {
    this.loadRestaurants();
  },

  methods: {
    async loadRestaurants() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/locales/");
        this.restaurants = response.data;
      } catch (error) {
        console.error("Error al cargar los restaurantes:", error);
        this.errorMessage = "Error al cargar los restaurantes. Intente de nuevo.";
      }
    },

    async loadLocations() {
      if (this.selectedRestaurant) {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/zonas/");
          this.locations = response.data.filter(location => location.local_fk === this.selectedRestaurant);
          
          if (this.locations.length > 0) {
            this.selectedLocation = this.locations[0].id;
          }
          if (this.locations.length === 0) {
            console.log("No se encontraron localizaciones para el restaurante seleccionado");
            this.errorMessage = "No hay localizaciones disponibles para este restaurante.";
          } else {
            this.errorMessage = null;
          }
        } catch (error) {
          console.error("Error al cargar las localizaciones:", error);
          this.errorMessage = "Error al cargar las localizaciones. Intente de nuevo.";
        }
      } else {
        this.locations = [];
      }
    },

    async submitForm() {
      if (this.$refs.formEvento.validate()) {
        try {
          const token = localStorage.getItem("token");

          if (token) {
            const decodedToken = jwtDecode(token);

            const headers = {
              Authorization: `Bearer ${token}`,
            };

            const eventData = {
              nombre: this.formEvento.eventName,
              descripcion: this.formEvento.description,
              zona: [this.selectedLocation],
              usuario: decodedToken.user_id,
            };

            await axios.post("http://127.0.0.1:8000/api/eventos/", eventData, { headers });

            this.successMessage = "Evento registrado exitosamente";

            // Redirigir después de 1 segundo
            setTimeout(() => {
              this.$router.push('/'); // Redirige a la página de inicio
            }, 1000);

            this.resetForm();
          } else {
            this.errorMessage = "No se encontró un token válido.";
          }
        } catch (error) {
          console.error("Error al registrar el evento:", error);
          this.errorMessage = "Error al registrar el evento. Intenta de nuevo.";
        }
      }
    },

    goBack() {
      this.$router.push('/'); // Redirige al usuario a la página de inicio
    },

    resetForm() {
      this.formEvento.eventName = "";
      this.formEvento.description = "";
      this.selectedRestaurant = null;
      this.selectedLocation = null;
      this.locations = [];
    },
  },
};
</script>
