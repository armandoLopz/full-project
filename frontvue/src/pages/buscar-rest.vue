<template>
  <v-container>
    <AppBar title="Encuentra tu restaurante preferido"/>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-text-field
          v-model="busqueda"
          label="Buscar por localización"
          prepend-inner-icon="mdi-map-marker"
          clearable
          @input="buscarRestaurantes"
        ></v-text-field>

        <v-list v-if="restaurantesFiltrados.length > 0">
          <v-list-item
            v-for="restaurante in restaurantesFiltrados"
            :key="restaurante.id"
            :title="restaurante.nombre"
            :subtitle="`${restaurante.tipo_comida} - Localización: ${obtenerLocalizacion(restaurante.id)}`"
          >
            <template v-slot:prepend>
              <v-avatar color="grey-lighten-1">
                <v-icon color="white">mdi-food</v-icon>
              </v-avatar>
            </template>

            <template v-slot:append>
              <v-btn
                :href="`tel:${restaurante.contacto}`"
                icon="mdi-phone"
                variant="text"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-alert
          v-else-if="busqueda && restaurantesFiltrados.length === 0"
          type="info"
          text="No se encontraron restaurantes en la localización buscada."
          color="#FF7043"
          class="white--text"
        ></v-alert>
      </v-col>
    </v-row>
    <NavigateToShow/>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const restaurantes = ref([]);
const zonas = ref([]);
const busqueda = ref('');

const obtenerRestaurantes = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/locales/');
    restaurantes.value = response.data;
  } catch (error) {
    console.error('Error al obtener los restaurantes:', error);
  }
};

const obtenerZonas = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/zonas/');
    zonas.value = response.data;
  } catch (error) {
    console.error('Error al obtener las zonas:', error);
  }
};

const obtenerLocalizacion = (localId) => {
  const zona = zonas.value.find(z => z.local_fk === localId);
  if (zona) {
    return `${zona.estado}, ${zona.ciudad}, ${zona.calle}`;
  }
  return 'Localización no disponible';
};

const restaurantesFiltrados = computed(() => {
  if (!busqueda.value) return restaurantes.value;
  return restaurantes.value.filter(restaurante => {
    const zona = zonas.value.find(z => z.local_fk === restaurante.id);
    if (zona) {
      const localizacion = `${zona.estado} ${zona.ciudad} ${zona.calle}`.toLowerCase();
      return localizacion.includes(busqueda.value.toLowerCase());
    }
    return false;
  });
});

const buscarRestaurantes = () => {
  // Esta función se llama cada vez que se modifica el campo de búsqueda
  // No es necesario hacer nada aquí porque estamos usando un computed property
};

onMounted(async () => {
  await obtenerZonas();
  await obtenerRestaurantes();
});
</script>
  