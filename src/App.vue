<template>
  <v-app id="app">
    <app-sidebar></app-sidebar>
    <app-header></app-header>
    <main>
      <v-content>
        <v-container fluid>
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <router-view></router-view>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
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
    data() {
      return {};
    }
  };
</script>

<style lang="stylus">
  @import './stylus/main';

  .card--flex-toolbar {
    margin-top: -64px;
  }
</style>
