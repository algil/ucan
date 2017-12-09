<template>
  <v-card>
    <v-toolbar card color="white" prominent>
      <v-icon>pets</v-icon>
      <v-toolbar-title class="grey--text">
        {{ $t('pet.general.title') }}
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text class="pt-0">
      <v-container grid-list-sm class="py-0">
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <v-text-field
              :label="$t('label.name')"
              v-model="pet.name"
              data-vv-name="name"
              :error-messages="errors.collect('name')"
              v-validate="'required|max:100'"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  import * as EventTypes from '@/event-types';

  export default {
    name: 'pet-view-form',

    props: {
      pet: {
        required: true,
        type: Object
      }
    },

    mounted () {
      this.$events.on(EventTypes.FORM_ON_SAVE, this.save);
    },

    beforeDestroy () {
      this.$events.off(EventTypes.FORM_ON_SAVE, this.save);
    },

    methods: {
      async save () {
        let isValid = await this.$validator.validateAll();
        if (isValid) {
          this.$emit('save', this.pet);
        }
      }
    }
  };
</script>
