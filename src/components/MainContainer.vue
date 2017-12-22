<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'main-container',

    created () {
      this.$vuetify.theme.primary = '#fd9727';
      this.$vuetify.theme.accent = '#cddb49';
      this.$store.commit('dark', false);
    }
  };
</script>
