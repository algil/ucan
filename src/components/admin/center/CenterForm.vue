<template>
  <div>
    Nuevo centro
  </div>
</template>


<script>
  export default {
    name: 'center-form',
    data() {
      return {
        id: this.$route.params.id
      };
    },
    computed: {
      isEditMode() {
        console.log(this.id);
        return this.id !== 'new';
      }
    }
  }
</script>
