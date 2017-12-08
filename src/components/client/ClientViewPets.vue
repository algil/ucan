<template>
  <v-card>
    <v-toolbar card color="white" prominent>
      <v-icon>pets</v-icon>
      <v-toolbar-title class="grey--text">
        {{ $t('client.pets.title') }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip left>
        <v-btn icon slot="activator">
          <v-icon>add</v-icon>
        </v-btn>
        <span>{{ $t('label.newPet') }}</span>
      </v-tooltip>
    </v-toolbar>
    <v-divider></v-divider>

    <v-card-text v-show="!pets" class="text-xs-center grey--text text--darken-1">
      <p>{{ $t('client.pets.noData') }}</p>
    </v-card-text>
    <v-card-text v-show="pets">
      <v-container class="pa-0">
        <v-layout row wrap>
          <client-view-pet-item
            v-for="pet in pets"
            :key="pet.id"
            :pet="pet"
            @click="viewPet(pet)"
          ></client-view-pet-item>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  import ClientViewPetItem from './ClientViewPetItem';

  export default {
    name: 'client-view-pets',

    components: {
      ClientViewPetItem
    },

    props: {
      pets: {
        required: false,
        type: Array
      }
    },

    methods: {
      viewPet (pet) {
        console.log('viewPet', pet);
      }
    }
  };
</script>
