<template>
  <v-list dense class="pt-0">
    <v-list-tile v-for="item in items" :key="item.title">
      <v-list-tile-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-divider></v-divider>

    <v-list-tile key="12">
      <v-list-tile-action>
        <v-icon>settings</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Configuración</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: 'app-menu',
    data: () => ({
      items: [
        { title: 'Inicio', icon: 'home' },
        { title: 'Nuevo Cliente', icon: 'person_add' }
      ]
    })
  };
</script>
