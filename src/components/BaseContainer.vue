<template>
  <div>
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
        <v-container layout fluid justify-center grid-list-lg v-if="!isMobile" key="main-desktop">
          <v-layout wrap flex sm12 xl8>
            <v-flex xs12>
              <router-view></router-view>
            </v-flex>
          </v-layout>
        </v-container>

        <v-layout row v-else-if="isMobile" key="main-mobile">
          <v-flex xs12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </div>
    </v-content>
  </div>
</template>

<script>
  import AppSidebar from '@/components/layout/AppSidebar';
  import AppHeader from '@/components/layout/AppHeader';

  export default {
    name: 'base-container',

    components: {
      AppSidebar,
      AppHeader
    }
  };
</script>
