<template>
  <v-toolbar class="primary" dark app>
    <v-toolbar-side-icon @click.stop="toggleSidebar"></v-toolbar-side-icon>
    <v-toolbar-title>Inicio</v-toolbar-title>
  </v-toolbar>
</template>


<script>
  export default {
    name: 'app-header',
    methods: {
      toggleSidebar () {
        this.$store.commit('sidebar', !this.$store.state.sidebar);
      }
    }
  };
</script>
