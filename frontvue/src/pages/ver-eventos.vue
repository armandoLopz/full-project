<template>
  <v-app theme="dark">
    <AppBar title="Eventos realizados por nuestra comunidad"/>
    <v-main>
      <v-container>
        <h1 class="text-h4 mb-6">Eventos compartidos</h1>
        <NavigateToShow />
        <v-row v-if="loading" justify="center">
          <v-col cols="12" class="text-center">
            <v-progress-circular indeterminate color="#FF7043" size="64"></v-progress-circular>
          </v-col>
        </v-row>
        <v-row v-else-if="error" justify="center">
          <v-col cols="12" class="text-center">
            <v-alert type="error" text>{{ error }}</v-alert>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col v-for="evento in eventosConDetalles" :key="evento.id" cols="12" md="6" lg="4">
            <v-card class="mx-auto" max-width="400">
              <v-card-title class="text-h5 font-weight-bold" style="color: #FF5722; position: relative;">
                {{ evento.nombre }}
                <v-btn
                  v-if="evento.isOwnEvent"
                  icon="mdi-pencil"
                  size="small"
                  @click="openEditDialog(evento)"
                  style="position: absolute; top: 4px; right: 4px;"
                ></v-btn>
              </v-card-title>
              <v-card-text>
                <p>{{ evento.descripcion }}</p>
                <v-divider class="my-2"></v-divider>
                <p class="text-body-2">Creado por: {{ evento.nombreUsuario }}</p>
                <p class="text-body-2">Lugar: {{ evento.nombreZona }}</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Evento</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editedEvent.nombre"
            label="Nombre del evento"
            required
          ></v-text-field>
          <v-textarea
            v-model="editedEvent.descripcion"
            label="Descripción"
            required
          ></v-textarea>
          <!-- Aquí puedes agregar más campos si es necesario -->
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeEditDialog">Cancelar</v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="updateEvent">Guardar</v-btn>
          <v-btn color="red-darken-1" variant="text" @click="confirmDelete">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteConfirmDialog" max-width="300px">
      <v-card>
        <v-card-title class="text-h5">Confirmar eliminación</v-card-title>
        <v-card-text>¿Estás seguro de que quieres eliminar este evento?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="deleteConfirmDialog = false">Cancelar</v-btn>
          <v-btn color="red-darken-1" variant="text" @click="deleteEvent">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useTheme } from 'vuetify'
import { jwtDecode } from "jwt-decode"

const theme = useTheme()
theme.global.name.value = 'dark'

const eventos = ref([])
const usuarios = ref({})
const zonas = ref({})
const loading = ref(true)
const error = ref(null)
const editDialog = ref(false)
const deleteConfirmDialog = ref(false)
const editedEvent = ref({})
const currentUserId = ref(null)

const API_BASE_URL = 'http://127.0.0.1:8000/api'

const fetchEventos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/eventos/`)
    eventos.value = response.data
    await Promise.all([fetchUsuarios(), fetchZonas()])
    loading.value = false
  } catch (e) {
    error.value = 'Hubo un error al cargar los eventos. Por favor, intente de nuevo más tarde.'
    loading.value = false
    console.error('Error al cargar los eventos:', e)
  }
}

const fetchUsuarios = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/`)
    usuarios.value = response.data.reduce((acc, usuario) => {
      acc[usuario.id] = usuario.username 
      return acc
    }, {})
  } catch (e) {
    console.error('Error al cargar los usuarios:', e)
  }
}

const fetchZonas = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/zonas/`)
    zonas.value = response.data.reduce((acc, zona) => {
      acc[zona.id] = zona.estado + ", " + zona.ciudad + ", "+ zona.calle 
      return acc
    }, {})
  } catch (e) {
    console.error('Error al cargar las zonas:', e)
  }
}

const eventosConDetalles = computed(() => {
  return eventos.value.map(evento => ({
    ...evento,
    nombreUsuario: usuarios.value[evento.usuario] || 'Usuario desconocido',
    nombreZona: evento.zona.map(zonaId => zonas.value[zonaId] || 'Zona desconocida').join(', '),
    isOwnEvent: evento.usuario === currentUserId.value
  }))
})

function openEditDialog(evento) {
  editedEvent.value = { ...evento }
  editDialog.value = true
}

function closeEditDialog() {
  editDialog.value = false
  editedEvent.value = {}
}

function confirmDelete() {
  deleteConfirmDialog.value = true
}

async function updateEvent() {
  try {
    const response = await axios.put(`${API_BASE_URL}/eventos/${editedEvent.value.id}/`, {
      nombre: editedEvent.value.nombre,
      descripcion: editedEvent.value.descripcion,
      usuario: editedEvent.value.usuario,
      zona: editedEvent.value.zona
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (response.status === 200) {
      const updatedEvent = response.data
      const index = eventos.value.findIndex(e => e.id === updatedEvent.id)
      if (index !== -1) {
        eventos.value[index] = { ...eventos.value[index], ...updatedEvent }
      }
      closeEditDialog()
    } else {
      console.error('Error updating event')
    }
  } catch (error) {
    console.error('Error updating event:', error)
  }
}

async function deleteEvent() {
  try {
    const response = await axios.delete(`${API_BASE_URL}/eventos/${editedEvent.value.id}/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (response.status === 204) {
      eventos.value = eventos.value.filter(e => e.id !== editedEvent.value.id)
      closeEditDialog()
      deleteConfirmDialog.value = false
    } else {
      console.error('Error deleting event')
    }
  } catch (error) {
    console.error('Error deleting event:', error)
  }
}

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    const decodedToken = jwtDecode(token)
    currentUserId.value = decodedToken.user_id
  }
  fetchEventos()
})
</script>

<style scoped>
.v-application {
  background-color: #121212 !important;
}

.v-card {
  transition: transform 0.3s;
}

.v-card:hover {
  transform: translateY(-5px);
}
</style>

