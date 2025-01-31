<template>
    <v-app>
      <AppBar title="Reseñas de nuestra comunidad"/>
      <v-main>
        <v-container>
          <h1 class="text-h4 mb-6">Experiencias compartidas</h1>
          <NavigateToShow />
          <v-row>
            <v-col v-for="review in reviews" :key="review.id" cols="12" md="6" lg="4">
              <v-card>
                <v-card-title style="color: #FF5722; position: relative;">
                  {{ review.userName }}
                  <v-spacer></v-spacer>
                  <v-rating
                    :model-value="review.calificacion"
                    color="amber"
                    density="compact"
                    half-increments
                    readonly
                    size="small"
                  ></v-rating>
                  <v-btn
                    v-if="review.isOwnReview"
                    icon="mdi-pencil"
                    size="small"
                    @click="openEditDialog(review)"
                    style="position: absolute; top: 4px; right: 4px;"
                  ></v-btn>
                </v-card-title>
                <v-card-subtitle>
                  {{ review.localName }}
                </v-card-subtitle>
                <v-card-text>
                  <p>{{ review.descripcion }}</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
  
      <v-dialog v-model="editDialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Editar Reseña</span>
          </v-card-title>
          <v-card-text>
            <v-textarea
              v-model="editedReview.descripcion"
              label="Descripción"
              required
            ></v-textarea>
            <v-rating
              v-model="editedReview.calificacion"
              color="amber"
              half-increments
            ></v-rating>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="closeEditDialog">Cancelar</v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="updateReview">Guardar</v-btn>
            <v-btn color="red-darken-1" variant="text" @click="confirmDelete">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <v-dialog v-model="deleteConfirmDialog" max-width="300px">
        <v-card>
          <v-card-title class="text-h5">Confirmar eliminación</v-card-title>
          <v-card-text>¿Estás seguro de que quieres eliminar esta reseña?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken" variant="text" @click="deleteConfirmDialog = false">Cancelar</v-btn>
            <v-btn color="red-darken-1" variant="text" @click="deleteReview">Eliminar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { jwtDecode } from "jwt-decode"
  
  const reviews = ref([])
  const editDialog = ref(false)
  const deleteConfirmDialog = ref(false)
  const editedReview = ref({})
  const currentUserId = ref(null)
  
  async function fetchUserName(userId) {
    const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}/`)
    const userData = await response.json()
    return userData.username
  }
  
  async function fetchLocalName(localId) {
    const response = await fetch(`http://127.0.0.1:8000/api/locales/${localId}/`)
    const localData = await response.json()
    return localData.nombre
  }
  
  function openEditDialog(review) {
    editedReview.value = { ...review }
    editDialog.value = true
  }
  
  function closeEditDialog() {
    editDialog.value = false
    editedReview.value = {}
  }
  
  function confirmDelete() {
    deleteConfirmDialog.value = true
  }
  
  async function updateReview() {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/comentarios/${editedReview.value.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          calificacion: editedReview.value.calificacion,
          descripcion: editedReview.value.descripcion,
          user_fk: editedReview.value.user_fk,
          local_fk: editedReview.value.local_fk
        })
      })
  
      if (response.ok) {
        const updatedReview = await response.json()
        const index = reviews.value.findIndex(r => r.id === updatedReview.id)
        if (index !== -1) {
          reviews.value[index] = { ...reviews.value[index], ...updatedReview }
        }
        closeEditDialog()
      } else {
        console.error('Error updating review')
      }
    } catch (error) {
      console.error('Error updating review:', error)
    }
  }
  
  async function deleteReview() {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/comentarios/${editedReview.value.id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
  
      if (response.ok) {
        reviews.value = reviews.value.filter(r => r.id !== editedReview.value.id)
        closeEditDialog()
        deleteConfirmDialog.value = false
      } else {
        console.error('Error deleting review')
      }
    } catch (error) {
      console.error('Error deleting review:', error)
    }
  }
  
  onMounted(async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const decodedToken = jwtDecode(token)
        currentUserId.value = decodedToken.user_id
      }
  
      const response = await fetch('http://127.0.0.1:8000/api/comentarios/')
      const reviewsData = await response.json()
  
      reviews.value = await Promise.all(reviewsData.map(async (review) => {
        const userName = await fetchUserName(review.user_fk)
        const localName = await fetchLocalName(review.local_fk)
        return {
          ...review,
          userName,
          localName,
          isOwnReview: review.user_fk === currentUserId.value
        }
      }))
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
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
  
  