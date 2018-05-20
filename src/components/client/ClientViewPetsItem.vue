<template>
  <v-flex shrink class="mr-5">
    <v-avatar class="pet-avatar" size="125px" @click="viewPet">
      <img :src="petImage" alt="avatar">
    </v-avatar>
    <v-layout justify-space-between align-strech>
      <h3 class="pet-title subheading pt-2" @click="viewPet">
        {{pet.name}}
      </h3>
      <v-menu bottom class="pet-actions">
        <v-btn icon slot="activator">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile @click="deletePet">
            <v-list-tile-title>{{ $t('label.delete') }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-layout>

  </v-flex>
</template>

<script>
export default {
  name: 'client-view-pets-item',

  props: {
    pet: {
      required: true,
      type: Object
    }
  },

  computed: {
    petImage () {
      // TODO: download a good pleaceholder image
      return this.pet.image ? this.pet.image : 'https://mylostpetalert.com/wp-content/themes/mlpa-child/images/nophoto.gif'
    }
  },

  methods: {
    viewPet () {
      this.$emit('click')
    },

    deletePet () {
      this.$emit('delete')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .pet
    text-align center

  .pet-avatar,
  .pet-title
    cursor pointer

  .pet-title
    flex-grow 1

  .pet-title
  .pet-actions
    align-self baseline
</style>
