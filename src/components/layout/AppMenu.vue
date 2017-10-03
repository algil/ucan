<template>
  <v-list dense>
    <v-list-tile v-for="item in items" :key="item.text">
      <v-list-tile-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ item.text }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-divider></v-divider>

    <v-list-tile key="12">
      <v-list-tile-action>
        <v-icon class="grey--text text--darken-1">settings</v-icon>
      </v-list-tile-action>
      <v-list-tile-title class="grey--text text--darken-1">Configuración</v-list-tile-title>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'app-menu',
    data: () => ({
      items: [
        {text: 'Inicio', icon: 'home'},
        {text: 'Nuevo Cliente', icon: 'person_add'}
      ]
    })
  };
</script>
