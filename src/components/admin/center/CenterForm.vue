<template>
  <div>
    Nuevo centro
  </div>
</template>


<script>
  export default {
    data() {
      return {
        id: this.$route.params.id
      };
    },
    computed: {
      isEditMode() {
        return this.id !== 'new';
      }
    }
  }
</script>
