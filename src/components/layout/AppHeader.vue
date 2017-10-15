<template>
  <v-toolbar dark app :extended="$vuetify.breakpoint.smAndUp" :color="$store.getters.primaryColor">
    <v-toolbar-side-icon @click.stop="toggleSidebar"></v-toolbar-side-icon>
    <v-toolbar-title v-if="$vuetify.breakpoint.xsOnly">{{$store.state.title}}</v-toolbar-title>
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

<style lang="stylus">

</style>
