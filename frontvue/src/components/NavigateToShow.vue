<template>
    <div>
      <!-- Mostrar el componente según el estado de autenticación -->
      <NavigateBar v-if="!isAuthenticated" />
      <NavigateAuthUser v-else />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isAuthenticated: false, // Variable para controlar el estado de autenticación
      };
    },
    created() {
      // Comprobar si hay un JWT en el almacenamiento local y si es válido
      this.checkAuthentication();
    },
    methods: {
      checkAuthentication() {
        // Obtener el JWT de localStorage
        const token = localStorage.getItem('token');
        
        if (token) {
          // Si el token existe, verificamos si está expirado
          const tokenExpiration = this.getTokenExpiration(token);
          
          if (tokenExpiration > Date.now()) {
            this.isAuthenticated = true;
          } else {
            this.isAuthenticated = false;
            // Eliminar el token si ha expirado
            localStorage.removeItem('token'); 
          }
        }
      },
      
      // Método para extraer la fecha de expiración del JWT
      getTokenExpiration(token) {
        const payload = JSON.parse(atob(token.split('.')[1])); 
        return payload.exp * 1000; 
      },
    },
  };
  </script>
  