<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'admin-container',
    data: function () {
      return {
      }
    },
    mounted: function () {
      this.$store.commit('module', 'admin');
    }
  }
</script>
