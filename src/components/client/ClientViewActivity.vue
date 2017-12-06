<template>
  <v-card :class="{'elevation-0 transparent': isMobile}" class="pa-4">
    <v-card-title class="px-0 pt-0">
      <h2 class="headline">
        <v-icon>history</v-icon>
        {{ $t('client.titleActivity') }}
      </h2>
    </v-card-title>
    <v-card-text>
      Activity information
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'client-view-activity',

    props: {
      pets: {
        required: false,
        type: Array
      }
    }
  };
</script>
