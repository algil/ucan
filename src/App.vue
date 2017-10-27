<template>
  <v-app id="app">
    <app-sidebar></app-sidebar>
    <app-header></app-header>
    <v-content>
      <v-container fluid fill-height v-show="$store.state.loading">
        <v-layout align-center justify-center>
          <v-progress-circular
            indeterminate
            :size="75"
            :color="$store.getters.primaryColor">
          </v-progress-circular>
        </v-layout>
      </v-container>
      <v-container fluid v-show="!$store.state.loading">
        <v-layout row>
          <v-flex xs12 sm8 offset-sm2>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
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
    data() {
      return {};
    }
  };
</script>

<style lang="stylus">
  @import './stylus/main';

</style>
