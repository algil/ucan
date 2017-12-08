<template>
  <v-card>
    <v-toolbar card color="white" prominent>
      <v-icon>perm_identity</v-icon>
      <v-toolbar-title class="grey--text">
        {{ $t('client.general.title') }}
      </v-toolbar-title>
    </v-toolbar>

    <v-card-text class="pt-0">
      <v-container grid-list-sm class="py-0">
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <v-text-field
              :label="$t('label.name')"
              v-model="client.name"
              data-vv-name="name"
              :error-messages="errors.collect('name')"
              v-validate="'required|max:100'"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              :label="$t('label.surname')"
              v-model="client.surname"
              data-vv-name="surname"
              :error-messages="errors.collect('surname')"
              v-validate="'required|max:100'"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              :label="$t('label.address')"
              v-model="client.address"
              data-vv-name="address"
              :error-messages="errors.collect('address')"
              v-validate="'required|max:255'"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field
              :label="$t('label.town')"
              v-model="client.town"
              data-vv-name="town"
              :error-messages="errors.collect('town')"
              v-validate="'required|max:255'"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field
              :label="$t('label.city')"
              v-model="client.city"
              data-vv-name="city"
              :error-messages="errors.collect('city')"
              v-validate="'required|max:255'"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm4>
            <v-text-field
              :label="$t('label.postalCode')"
              v-model="client.postalCode"
              data-vv-name="postalCode"
              :error-messages="errors.collect('postalCode')"
              v-validate="'required|digits:5'"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3>
            <v-text-field
              :label="$t('label.phone1')"
              v-model="client.phone1"
              data-vv-name="phone1"
              :error-messages="errors.collect('phone1')"
              v-validate="'required|digits:9'"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3>
            <v-text-field
              :label="$t('label.phone2')"
              v-model="client.phone2"
              data-vv-name="phone2"
              :error-messages="errors.collect('phone2')"
              v-validate="'digits:9'"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              :label="$t('label.email')"
              v-model="client.email"
              data-vv-name="email"
              :error-messages="errors.collect('email')"
              v-validate="'required|email'"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              :label="$t('label.occupation')"
              v-model="client.occupation"
              data-vv-name="occupation"
              :error-messages="errors.collect('occupation')"
              v-validate="'max:255'"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field
              :label="$t('label.howFoundUs')"
              v-model="client.howFoundUs"
              data-vv-name="howFoundUs"
              :error-messages="errors.collect('howFoundUs')"
              v-validate="'|max:255'"
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
          this.$emit('save', this.client);
        }
      }
    }
  };
</script>
