<template>
  <v-card :class="{'elevation-0 transparent': isMobile}">
    <form>
      <v-container>
        <v-layout column>
          <v-flex xs12 md8 offset-md2>
            <v-text-field
              :label="$t('label.name')"
              v-model="service.name"
              data-vv-name="name"
              :error-messages="errors.collect('name')"
              v-validate="'required'"
            ></v-text-field>
            <v-text-field
              :label="$t('label.cost')"
              type="number"
              v-model="service.cost"
              suffix="€"
              data-vv-name="cost"
              :error-messages="errors.collect('cost')"
              v-validate="'required|min_value:1'"
            ></v-text-field>
            <v-checkbox
              :label="$t('label.active')"
              v-model="service.active">
            </v-checkbox>
          </v-flex>
        </v-layout>
      </v-container>
    </form>
  </v-card>
</template>

<script>
  import * as EventTypes from '@/event-types';

  export default {
    props: {
      id: {
        required: true,
        type: String
      }
    },

    data () {
      return {
        service: {
          active: true
        },
        isEditMode: false
      };
    },

    mounted () {
      this.init();
      this.$store.commit('showBack', true);
      this.$events.on(EventTypes.GO_BACK, this.navigateToServiceList);
      this.$events.on(EventTypes.SERVICE_ON_SAVE, this.save);
    },

    beforeDestroy () {
      this.$store.commit('showBack', false);
      this.$events.off(EventTypes.GO_BACK, this.navigateToServiceList);
      this.$events.off(EventTypes.SERVICE_ON_SAVE, this.save);
    },

    methods: {
      init () {
        this.isEditMode = this.id !== 'new';
        if (this.isEditMode) {
          this.loadService();
        } else {
          this.$store.commit('title', this.$t('service.titleNew'));
        }
      },

      async loadService () {
        this.service = await this.$store.dispatch('services/get', this.id);
        this.$store.commit('title', `'${this.service.name}'`);
      },

      async save () {
        let isValid = await this.$validator.validateAll();
        if (isValid) {
          await this.$store.dispatch('services/save', this.service);
          this.$snackBar.success(this.$t('service.saveSuccess'));
          this.navigateToServiceList();
        }
      },

      navigateToServiceList () {
        this.$router.push({name: 'ServiceList'});
      }
    }
  };
</script>
