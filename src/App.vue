<template>
  <v-app id="app">
    <app-sidebar></app-sidebar>
    <app-header></app-header>

    <v-content>
      <!-- BUSY INDICATOR -->
      <v-container fluid fill-height v-show="$store.state.loading">
        <v-layout align-center justify-center>
          <v-progress-circular
            indeterminate
            :size="75"
            color="primary">
          </v-progress-circular>
        </v-layout>
      </v-container>

      <!-- MAIN VIEW -->
      <div v-show="!$store.state.loading">
        <v-container fluid v-if="!isMobile" key="main-desktop">
          <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
              <router-view></router-view>
            </v-flex>
          </v-layout>
        </v-container>

        <v-layout row v-else-if="isMobile" key="main-desktop">
          <v-flex xs12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </div>
    </v-content>

    <!--Dialog-->
    <app-dialog></app-dialog>
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
    }
  };
</script>

<style lang="stylus">
  @import './stylus/main';

</style>
