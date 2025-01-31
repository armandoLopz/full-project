<template>
    <AppBar title="Mis restaurantes" /> <br /> <br />
    <v-container>
      <h1 class="text-h4 mb-6">Restaurantes asociados a tu cuenta</h1>
      <NavigateToShow />
      <v-row v-if="restaurants.length > 0">
        <v-col v-for="restaurant in restaurants" :key="restaurant.id" cols="12" sm="6" md="4">
          <v-card class="restaurant-card" elevation="2" @mouseover="hover = restaurant.id" @mouseleave="hover = null">
            <v-card-title :style="{ color: '#FF7043' }">
              {{ restaurant.nombre }}
            </v-card-title>
            <v-card-subtitle>{{ restaurant.tipo_comida }}</v-card-subtitle>
            <v-card-text>
              <strong>Contacto:</strong> {{ restaurant.contacto }}
            </v-card-text>
            <v-expand-transition>
              <div v-if="hover === restaurant.id">
                <v-divider></v-divider>
                <v-card-actions>
                  <v-btn text :color="'#FF7043'" @click="openEditDialog(restaurant)">
                    Editar
                  </v-btn>
                </v-card-actions>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
  
      <v-alert v-else type="info" class="mt-4">
        No tienes restaurantes registrados. ¡Agrega uno nuevo!
      </v-alert>
  
      <!-- Dialogo de edición o creación de restaurante -->
      <v-dialog v-model="editDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ editedRestaurant.id ? 'Editar' : 'Agregar' }} Restaurante</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="editedRestaurant.nombre"
                label="Nombre"
                :rules="[v => !!v || 'El nombre es requerido']"
                required
              ></v-text-field>
              <v-select
                v-model="editedRestaurant.tipo_comida"
                :items="['Italiana', 'Japonesa', 'Mexicana', 'Americana', 'Vegetariana', 'Vegana']"
                label="Tipo de Comida"
                :rules="[v => !!v || 'El tipo de comida es requerido']"
                required
              ></v-select>
              <v-text-field
                v-model="editedRestaurant.contacto"
                label="Contacto"
                :rules="[v => !!v || 'El contacto es requerido']"
                required
              ></v-text-field>
  
              <v-subheader>Direcciones</v-subheader>
              <v-list>
                <v-list-item v-for="(address, index) in editedRestaurant.addresses" :key="index">
                  <v-list-item-content>
                    {{ `${address.estado}, ${address.ciudad}, ${address.calle}` }}
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-tooltip bottom :disabled="editedRestaurant.addresses.length > 1">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          icon
                          @click="removeAddress(index)"
                          :disabled="editedRestaurant.addresses.length === 1"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </template>
                      <span>No se puede eliminar la dirección porque solo hay una</span>
                    </v-tooltip>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
  
              <v-btn
                class="mt-4"
                :color="'#FF7043'"
                @click="addNewAddress"
                text
              >
                <v-icon left>mdi-plus</v-icon>
                Agregar Dirección
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeEditDialog">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="saveRestaurant">Guardar</v-btn>
            <v-btn v-if="editedRestaurant.id" color="red darken-1" text @click="openDeleteConfirmDialog">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- Dialogo para agregar dirección -->
      <v-dialog v-model="addressDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Agregar Dirección</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="addressForm" v-model="validAddress">
              <v-text-field
                v-model="newAddress.estado"
                label="Estado"
                :rules="[v => !!v || 'El estado es requerido']"
                required
              ></v-text-field>
              <v-text-field
                v-model="newAddress.ciudad"
                label="Ciudad"
                :rules="[v => !!v || 'La ciudad es requerida']"
                required
              ></v-text-field>
              <v-text-field
                v-model="newAddress.calle"
                label="Calle"
                :rules="[v => !!v || 'La calle es requerida']"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeAddressDialog">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="saveAddress">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- Dialogo de confirmación para eliminar dirección -->
      <v-dialog v-model="confirmDeleteDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">¿Estás seguro de eliminar esta dirección?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="confirmDeleteAddress">Eliminar</v-btn>
            <v-btn color="blue darken-1" text @click="closeConfirmDeleteDialog">Cancelar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <v-dialog v-model="confirmDeleteRestaurantDialog" max-width="400px">
        <v-card>
          <v-card-title class="headline">¿Estás seguro de eliminar el local?</v-card-title>
          <v-card-text>Esta acción no se puede deshacer.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="confirmDeleteRestaurantDialog = false">Cancelar</v-btn>
            <v-btn color="red darken-1" text @click="deleteRestaurant">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <style scoped>
  .restaurant-card {
    transition: all 0.3s ease;
  }
  .restaurant-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  </style>
  
  <script>
  import axios from 'axios';
  import { jwtDecode } from 'jwt-decode';
  
  export default {
    data() {
      return {
        restaurants: [],
        hover: null,
        editDialog: false,
        addressDialog: false,
        confirmDeleteDialog: false,
        confirmDeleteRestaurantDialog: false,
        valid: true,
        validAddress: true,
        editedRestaurant: {
          id: null,
          nombre: '',
          tipo_comida: '',
          contacto: '',
          addresses: []
        },
        newAddress: {
          estado: '',
          ciudad: '',
          calle: ''
        },
        addressToDelete: null
      };
    },
    mounted() {
      this.fetchRestaurants();
    },
    methods: {
      async fetchRestaurants() {
        try {
          const token = localStorage.getItem('token');
          const decodedToken = jwtDecode(token);
          const userId = decodedToken.user_id;
  
          const response = await axios.get('http://127.0.0.1:8000/api/locales/', {
            headers: { Authorization: `Bearer ${token}` }
          });
  
          this.restaurants = response.data.filter(restaurant => restaurant.usuario === userId);
  
          for (let restaurant of this.restaurants) {
            const addressesResponse = await axios.get('http://127.0.0.1:8000/api/zonas/', {
              headers: { Authorization: `Bearer ${token}` }
            });
            restaurant.addresses = addressesResponse.data.filter(address => address.local_fk === restaurant.id);
          }
        } catch (error) {
          console.error('Error fetching restaurants:', error);
        }
      },
      openEditDialog(restaurant) {
        this.editedRestaurant = JSON.parse(JSON.stringify(restaurant));
        this.editDialog = true;
      },
      closeEditDialog() {
        this.editDialog = false;
        this.$nextTick(() => {
          this.editedRestaurant = {
            id: null,
            nombre: '',
            tipo_comida: '',
            contacto: '',
            addresses: []
          };
        });
      },
      async saveRestaurant() {
        if (this.$refs.form.validate()) {
          try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };
            const restaurantData = {
              nombre: this.editedRestaurant.nombre,
              tipo_comida: this.editedRestaurant.tipo_comida,
              contacto: this.editedRestaurant.contacto,
              usuario: jwtDecode(token).user_id
            };
  
            if (this.editedRestaurant.id) {
              await axios.put(`http://127.0.0.1:8000/api/locales/${this.editedRestaurant.id}/`, restaurantData, { headers });
            } else {
              await axios.post('http://127.0.0.1:8000/api/locales/', restaurantData, { headers });
            }
  
            this.closeEditDialog();
            this.fetchRestaurants();
          } catch (error) {
            console.error('Error saving restaurant:', error);
          }
        }
      },
      openDeleteConfirmDialog() {
        this.confirmDeleteRestaurantDialog = true;
      },
      async deleteRestaurant() {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/locales/${this.editedRestaurant.id}/`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
  
          this.closeEditDialog();
          this.confirmDeleteRestaurantDialog = false;
          this.fetchRestaurants();
        } catch (error) {
          console.error('Error deleting restaurant:', error);
        }
      },
      addNewAddress() {
        this.addressDialog = true;
      },
      closeAddressDialog() {
        this.addressDialog = false;
        this.newAddress = {
          estado: '',
          ciudad: '',
          calle: ''
        };
      },
      async saveAddress() {
        if (this.$refs.addressForm.validate()) {
          this.editedRestaurant.addresses.push({ ...this.newAddress });
          this.closeAddressDialog();
        }
      },
      openConfirmDeleteDialog(address, index) {
        this.addressToDelete = { address, index };
        this.confirmDeleteDialog = true;
      },
      confirmDeleteAddress() {
        if (this.addressToDelete) {
          const { index } = this.addressToDelete;
          this.editedRestaurant.addresses.splice(index, 1);
          this.closeConfirmDeleteDialog();
        }
      },
      closeConfirmDeleteDialog() {
        this.confirmDeleteDialog = false;
        this.addressToDelete = null;
      },
      removeAddress(index) {
        if (this.editedRestaurant.addresses.length > 1) {
          this.openConfirmDeleteDialog(this.editedRestaurant.addresses[index], index);
        }
      }
    }
  };
  </script>
  
  
  