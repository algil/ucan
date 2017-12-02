<template>
  <v-app id="app" :dark="$store.state.dark">
    <router-view></router-view>

    <!--Dialog-->
    <app-dialog></app-dialog>
    <!--Snack bar-->
    <app-snack-bar></app-snack-bar>
  </v-app>
</template>

<script>
  export default {
    name: 'app'
  };
</script>

<style lang="stylus">
  @import './stylus/main';

</style>
