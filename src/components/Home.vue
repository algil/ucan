<template>
  <div>
    Home 2
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    mounted() {
      this.$store.commit('module', 'main');
    }
  };
</script>
