<template>
  <VApp>
    <AppBar/>

    <VMain>
      <v-container fluid>

        <h2>Eventos más destacados por nuestra comunidad</h2> <br>
        <v-row align="center" justify="center" dense>
          <!-- Evento 1: Restaurante destacado -->
          <v-col cols="12" md="6">
            <v-card
              append-icon="mdi-food"
              class="mx-auto"
              prepend-icon="mdi-map-marker"
              subtitle="Restaurante destacado del mes"
              title="Cena en El Buen Sabor"
            >
              <v-card-text>Disfruta de una experiencia culinaria única en El Buen Sabor. ¡Reserva ahora y obtén un 10% de descuento!</v-card-text>
            </v-card>
          </v-col>

          <!-- Evento 2: Feria Gastronómica -->
          <v-col cols="12" md="6">
            <v-card
              class="mx-auto"
              subtitle="Feria gastronómica anual"
              title="Feria del Sabor Local"
            >
              <template v-slot:prepend>
                <v-icon color="primary" icon="mdi-food-fork-drink"></v-icon>
              </template>
              <template v-slot:append>
                <v-icon color="success" icon="mdi-calendar-check"></v-icon>
              </template>
              <v-card-text>Vive una experiencia única con los mejores sabores locales. ¡No te lo pierdas, este fin de semana!</v-card-text>
            </v-card>
          </v-col>

          <!-- Evento 3: Clase de cocina -->
          <v-col cols="12" md="6">
            <v-card
              append-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
              class="mx-auto"
              prepend-avatar="https://cdn.vuetifyjs.com/images/logos/v-alt.svg"
              subtitle="Clase de cocina con el chef Juan"
              title="Cocina Internacional"
            >
              <template v-slot:prepend>
                <v-icon icon="mdi-chef-hat"></v-icon>
              </template>
              <v-card-text>Aprende a preparar platos internacionales con el chef Juan. ¡Inscríbete para la próxima clase!</v-card-text>
            </v-card>
          </v-col>

          <!-- Evento 4: Cata de Vinos -->
          <v-col cols="12" md="6">
            <v-card
              class="mx-auto"
              subtitle="Cata exclusiva de vinos"
              title="Noche de Vinos y Tapas"
            >
              <template v-slot:prepend>
                <v-avatar color="deep-purple accent-4">
                  <v-icon icon="mdi-wine-glass"></v-icon>
                </v-avatar>
              </template>
              <template v-slot:append>
                <v-avatar size="24">
                  <v-img
                    alt="Vino"
                    src="https://cdn.vuetifyjs.com/images/john.png"
                  ></v-img>
                </v-avatar>
              </template>
              <v-card-text>Únete a nosotros para una noche exclusiva de vinos y tapas. Reserva tu lugar y disfruta de una velada única.</v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </v-container>

      <VContainer>
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-img
              src="@/assets/evento2.2.jpg"
              max-width="700"
              max-height="300"
              contain
            >
              <div class="fill-height bottom-gradient"></div>
            </v-img>
          </v-col>

          <v-col
            cols="12"
            sm="6"
          >
            <v-img
              src="@/assets/evento5.jpg"
              max-width="700"
              max-height="300"
              contain
            >
              <div class="fill-height bottom-gradient"></div>
            </v-img>
          </v-col>
        </v-row>
      </VContainer>

      <VContainer fluid>
        <h2>Recomendaciones personalizadas para ti</h2> <br>
        <v-row>
            <!-- Primera tarjeta -->
            <v-col cols="12" sm="4">
              <v-card class="mx-auto" max-width="400">
                <v-img class="align-end text-white" height="200" src="@/assets/restaurant1.1.jpg" cover>
                  <v-card-title class="restaurant">La Parrilla del Mar</v-card-title>
                </v-img>

                <v-card-subtitle class="pt-4">
                  Restaurante de mariscos
                </v-card-subtitle>

                <v-card-text>
                  <div>Mariscos frescos y vistas al mar</div>
                  <div>Calle del Mar, 45 - Valencia</div>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Segunda tarjeta -->
            <v-col cols="12" sm="4">
              <v-card class="mx-auto" max-width="400">
                <v-img class="align-end text-white" height="200" src="@/assets/restaurant3.3.avif" cover>
                  <v-card-title  class="restaurant">El Refugio del Sabor</v-card-title>
                </v-img>

                <v-card-subtitle class="pt-4">
                  Cocina tradicional española
                </v-card-subtitle>

                <v-card-text>
                  <div>Deliciosos platos caseros en un ambiente acogedor</div>
                  <div>Calle Mayor, 102 - Puerto Cabello</div>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- Tercera tarjeta -->
            <v-col cols="12" sm="4">
              <v-card class="mx-auto" max-width="400">
                <v-img class="align-end text-white" height="200" src="@/assets/restaurant2.jpg" cover>
                  <v-card-title class="restaurant">La Pizzería Toscana</v-card-title>
                </v-img>

                <v-card-subtitle class="pt-4">
                  Pizzas artesanas al estilo italiano
                </v-card-subtitle>

                <v-card-text>
                  <div>Pizzas hechas a mano con ingredientes frescos</div>
                  <div>Calle de la Pizza, 30 - Caracas</div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        
      </VContainer>
    </VMain>
    
    <NavigateToShow/>
  </VApp>
</template>

<style scoped>

.title {
  font-family: sans-serif;
  font-size: 2rem;
  text-align: center;
  margin: 0;
  padding: 1.25rem 0;
}

.restaurant {

  color: rgb(255, 255, 255);
}

h2{

  margin-left: 3rem;
  margin-top: 2.1rem;
}
</style>