<template>
  <v-layout row wrap>
    <v-flex xs12>
      <client-view-form :client="client" @save="save"></client-view-form>
    </v-flex>
    <v-flex xs12 v-if="isEditMode">
      <client-view-pets :pets="pets" @view="viewPet" @delete="deletePet"></client-view-pets>
    </v-flex>
    <v-flex xs12 v-if="isEditMode">
      <client-view-activity :pets="pets"></client-view-activity>
    </v-flex>
  </v-layout>
</template>

<script>
import ClientViewForm from './ClientViewForm'
import ClientViewPets from './ClientViewPets'
import ClientViewActivity from './ClientViewActivity'

export default {
  props: {
    clientId: {
      required: true,
      type: String
    }
  },

  components: {
    ClientViewForm,
    ClientViewPets,
    ClientViewActivity
  },

  data () {
    return {
      client: {},
      pets: [],
      isEditMode: false
    }
  },

  mounted () {
    this.init()
    // this.$store.commit('showCancel', true);
  },

  beforeDestroy () {
    // this.$store.commit('showCancel', false);
  },

  methods: {
    init () {
      this.isEditMode = this.clientId !== 'new'
      if (this.isEditMode) {
        this.loadClient()
      } else {
        this.$store.commit('title', this.$t('client.titleNew'))
        this.client = {}
      }
    },

    async loadClient () {
      this.client = await this.$store.dispatch('clients/get', this.clientId)
      this.$store.commit('title', `'${this.client.name}'`)
      this.loadPets()
    },

    async loadPets () {
      this.pets = await this.$store.dispatch('pets/getByClientId', this.clientId)
    },

    viewPet (petId) {
      this.$router.push({name: 'PetView', params: {clientId: this.clientId, petId}})
    },

    async deletePet (petId) {
      await this.$store.dispatch('pets/remove', petId)
      this.$snackBar.success(this.$t('pet.deleteSuccess'))
      this.loadPets()
    },

    async save (client) {
      await this.$store.dispatch('clients/save', client)
      this.$snackBar.success(this.$t('client.saveSuccess'))
      if (!this.isEditMode) {
        this.$router.push({name: 'ClientView', params: {clientId: client.id}})
      }
    }
  }
}
</script>
