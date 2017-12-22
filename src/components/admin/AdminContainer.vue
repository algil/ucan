<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'admin-container',

    created () {
      // this.$vuetify.theme.primary = '#fea129';
      // this.$vuetify.theme.accent = '#ffd74f';
      this.$vuetify.theme.primary = '#fd9727';
      this.$vuetify.theme.accent = '#cddb49';

      this.$store.commit('dark', true);
    }
  };
</script>
