<template>
  <div>
    Home 2
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    };
  },
  mounted: function () {
    this.$store.commit('module', 'main')
  }
};
</script>
