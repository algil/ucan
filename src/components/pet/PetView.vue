<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <pet-view-form :pet="pet" @save="save"></pet-view-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import PetViewForm from './PetViewForm';

  export default {
    name: 'pet-view',

    components: {
      PetViewForm
    },

    props: {
      clientId: {
        required: true,
        type: String
      },
      petId: {
        required: true,
        type: String
      }
    },

    data () {
      return {
        pet: {},
        isEditMode: false
      };
    },

    mounted () {
      this.init();
      // this.$store.commit('showCancel', true);
    },

    beforeDestroy () {
      // this.$store.commit('showCancel', false);
    },

    methods: {
      init () {
        this.isEditMode = this.petId !== 'new';
        if (this.isEditMode) {
          this.loadPet();
        } else {
          this.$store.commit('title', this.$t('pet.titleNew'));
          this.pet = {};
        }
      },

      async loadPet () {
        this.pet = await this.$store.dispatch('pets/get', this.petId);
        this.$store.commit('title', `'${this.pet.name}'`);
      },

      async save (pet) {
        await this.$store.dispatch('pets/save', pet);
        this.$snackBar.success(this.$t('pet.saveSuccess'));
        this.$router.push({name: 'ClientView', params: {clientId: this.clientId}});
      }
    }
  };
</script>
