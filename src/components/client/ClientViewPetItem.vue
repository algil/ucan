<template>
  <v-flex xs12 sm3>
    <div column class="pet">
      <v-avatar class="pet-avatar" size="125px" @click="viewPet">
        <img :src="pet.image" alt="avatar">
      </v-avatar>
      <h3 class="pet-title subheading pt-2" @click="viewPet">
        {{pet.name}}
      </h3>
    </div>
  </v-flex>
</template>

<script>
  export default {
    name: 'client-view-pet-item',

    props: {
      pet: {
        required: true,
        type: Object
      }
    },

    methods: {
      viewPet () {
        this.$emit('click');
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .pet
    text-align center

  .pet-avatar,
  .pet-title
    cursor pointer

  .pet-title
    display inline-block
</style>
