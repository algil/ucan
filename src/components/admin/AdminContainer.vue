<template>
  <router-view></router-view>
</template>

<script>
  export default {
    name: 'admin-container',
    created() {
      this.$vuetify.theme.primary = '#fea129';
      this.$vuetify.theme.accent = '#ffd74f';
    }
  }
</script>
