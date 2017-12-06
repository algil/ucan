<template>
  <v-card :class="{'elevation-0 transparent': isMobile}" class="pa-4">
    <v-card-title class="px-0 pt-0">
      <h2 class="headline">
        <v-icon>person</v-icon>
        {{ $t('client.titleGeneral') }}
      </h2>
    </v-card-title>
    <v-container grid-list-sm class="py-0">
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-text-field
            :label="$t('label.name')"
            v-model="client.name"
            data-vv-name="name"
            :error-messages="errors.collect('name')"
            v-validate="'required'"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            :label="$t('label.surname')"
            v-model="client.surname"
            data-vv-name="surname"
            :error-messages="errors.collect('surname')"
            v-validate="'required'"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm9>
          <v-text-field
            :label="$t('label.address')"
            v-model="client.address"
            data-vv-name="address"
            :error-messages="errors.collect('address')"
            v-validate="'required'"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm3>
          <v-text-field
            :label="$t('label.postalCode')"
            v-model="client.postalCode"
            data-vv-name="postalCode"
            :error-messages="errors.collect('postalCode')"
            v-validate="'required'"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm3>
          <v-text-field
            :label="$t('label.phone1')"
            v-model="client.phone1"
            data-vv-name="phone1"
            :error-messages="errors.collect('phone1')"
            v-validate="'required'"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm3>
          <v-text-field
            :label="$t('label.phone2')"
            v-model="client.phone2"
            data-vv-name="phone2"
            :error-messages="errors.collect('phone2')"
            v-validate="'required'"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            :label="$t('label.email')"
            v-model="client.email"
            data-vv-name="email"
            :error-messages="errors.collect('email')"
            v-validate="'required'"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            :label="$t('label.occupation')"
            v-model="client.occupation"
            data-vv-name="occupation"
            :error-messages="errors.collect('occupation')"
            v-validate="'required'"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            :label="$t('label.howFoundUs')"
            v-model="client.howFoundUs"
            data-vv-name="howFoundUs"
            :error-messages="errors.collect('howFoundUs')"
            v-validate="'required'"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  import * as EventTypes from '@/event-types';

  export default {
    name: 'client-view-form',

    props: {
      client: {
        required: true,
        type: Object
      }
    },

    mounted () {
      this.$events.on(EventTypes.CLIENT_ON_SAVE, this.save);
    },

    beforeDestroy () {
      this.$events.off(EventTypes.CLIENT_ON_SAVE, this.save);
    },

    methods: {
      async save () {
        let isValid = await this.$validator.validateAll();
        if (isValid) {
          await this.$store.dispatch('clients/save', this.client);
          this.$snackBar.success(this.$t('client.saveSuccess'));
          if (!this.client.id) {
            // TODO: If it's not edit mode, navigate to this view with id
          }
        }
      }
    }
  };
</script>
