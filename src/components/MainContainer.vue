<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'main-container',

    created () {
      this.$vuetify.theme.primary = '#16bbd2';
      this.$vuetify.theme.accent = '#f3493f';
      this.$store.commit('dark', false);
    }
  };
</script>
