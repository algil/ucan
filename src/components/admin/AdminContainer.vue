<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'admin-container',

    created () {
      // this.$vuetify.theme.primary = '#fea129';
      // this.$vuetify.theme.accent = '#ffd74f';
      this.$vuetify.theme.primary = '#16bbd2';
      this.$vuetify.theme.accent = '#f3493f';

      // this.$store.commit('dark', true);
    }
  };
</script>
