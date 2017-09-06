<template>
  <v-app id="app" toolbar footer>
    <app-sidebar></app-sidebar>
    <app-header></app-header>
    <main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer></v-footer>
  </v-app>
</template>

<script>
  import AppSidebar from './components/layout/AppSidebar.vue';
  import AppHeader from './components/layout/AppHeader.vue';

  export default {
    name: 'app',
    components: {
      AppSidebar,
      AppHeader
    },
    data: () => ({
    })
  };
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
