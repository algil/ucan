<template>
  <v-navigation-drawer persistent v-model="showSidebar" enable-resize-watcher>
    <div class="text-xs-center pa-3">
      <div class="display-2 py-2">Ucan</div>
      <p>Cuidado y adiestramiento de mascotas</p>
    </div>
    <v-divider></v-divider>
    <app-menu></app-menu>
  </v-navigation-drawer>
</template>

<script>
  import {mapState} from 'vuex';
  import AppMenu from './AppMenu.vue';

  export default {
    name: 'app-sidebar',
    components: {
      AppMenu
    },
    computed: {
      ...mapState(['showSidebar'])
    }
  };
</script>
