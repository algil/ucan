<template>
  <v-card :class="{'elevation-0 transparent': isMobile}" class="pa-4">
    <v-card-title class="px-0 pt-0">
      <h2 class="headline">
        <v-icon>pets</v-icon>
        {{ $t('client.titlePets') }}
      </h2>
    </v-card-title>
    <v-card-text>
      Pets information
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'client-view-pets',

    props: {
      pets: {
        required: false,
        type: Array
      }
    }
  };
</script>
