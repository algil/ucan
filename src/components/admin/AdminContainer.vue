<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'admin-container',
    data() {
      return {}
    },
    mounted() {
      this.$store.commit('module', 'admin');
    }
  }
</script>
