<template>
    <v-container>
      <v-form v-model="isValid" @submit.prevent="submitForm">
        <!-- Nombre del Local -->
        <v-text-field
          v-model="form.localName"
          label="Nombre del Local"
          required
          :rules="[v => !!v || 'El nombre del local es obligatorio']"
        ></v-text-field>
  
        <!-- Contacto -->
        <v-text-field
          v-model="form.contact"
          label="Contacto"
          required
          :rules="[v => !!v || 'El contacto es obligatorio']"
        ></v-text-field>
  
        <!-- Tipo de Comida -->
        <v-select
          v-model="form.foodType"
          :items="foodTypes"
          label="Tipo de Comida"
          required
          :rules="[v => !!v || 'Selecciona el tipo de comida']"
        ></v-select>
  
        <!-- Calificación -->

  
        <!-- Botón de Enviar -->
        <v-btn type="submit" color="primary" :disabled="!isValid">Registrar Local</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Estado del formulario
        isValid: false,
        // Datos del formulario
        form: {
          localName: '',
          contact: '',
          foodType: '',
          rating: null,
        },
        // Opciones para el select de tipo de comida
        foodTypes: ['Italiana', 'Japonesa', 'Mexicana', 'Americana', 'Vegetariana', 'Vegana'],
      };
    },
    methods: {
      submitForm() {
        // Lógica para enviar los datos del formulario
        console.log('Formulario enviado:', this.form);
        // Aquí podrías hacer una solicitud a la API para registrar el local
      },
    },
  };
  </script>
  
  <style scoped>
  /* Puedes personalizar los estilos si es necesario */
  </style>
  