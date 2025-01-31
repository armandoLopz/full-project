<template>
    <router-link to="/">
      <v-card-title class="text-center">
        <span class="headline">{{ title }}</span>
      </v-card-title>
    </router-link>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true
      },
    },
  };
  </script>
  