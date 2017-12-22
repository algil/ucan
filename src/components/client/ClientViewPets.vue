<template>
  <v-card>
    <v-toolbar card color="white" prominent>
      <v-icon>pets</v-icon>
      <v-toolbar-title class="grey--text">
        {{ $t('client.pets.title') }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip left>
        <v-btn icon slot="activator" @click="viewPet()">
          <v-icon>add</v-icon>
        </v-btn>
        <span>{{ $t('label.newPet') }}</span>
      </v-tooltip>
    </v-toolbar>
    <v-divider></v-divider>

    <v-card-text v-show="!areTherePets" class="text-xs-center grey--text text--darken-1">
      <p>{{ $t('client.pets.noData') }}</p>
    </v-card-text>
    <v-card-text v-show="areTherePets">
      <v-layout wrap text-xs-center>
        <client-view-pets-item
          v-for="pet in pets"
          :key="pet.id"
          :pet="pet"
          @click="viewPet(pet.id)"
          @delete="deletePet(pet.id)"
        ></client-view-pets-item>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
  import ClientViewPetsItem from './ClientViewPetsItem';

  export default {
    name: 'client-view-pets',

    components: {
      ClientViewPetsItem
    },

    props: {
      pets: {
        required: false,
        type: Array
      }
    },

    computed: {
      areTherePets () {
        return this.pets && this.pets.length > 0;
      }
    },

    methods: {
      viewPet (petId) {
        this.$emit('view', petId);
      },

      deletePet (petId) {
        this.$emit('delete', petId);
      }
    }
  };
</script>
