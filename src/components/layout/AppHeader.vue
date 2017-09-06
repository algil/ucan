<template>
  <v-toolbar class="primary" dark>
    <v-toolbar-side-icon @click.stop="toggleSidebar"></v-toolbar-side-icon>
    <v-toolbar-title>Inicio</v-toolbar-title>
  </v-toolbar>
</template>


<script>
  import {mapMutations} from 'vuex';

  export default {
    name: 'app-header',
    methods: {
      ...mapMutations(['toggleSidebar'])
    }
  };
</script>
