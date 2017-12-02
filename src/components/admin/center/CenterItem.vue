<template>
    <v-card >
      <form>
        <v-container>
          <v-layout column>
            <v-flex xs12 md8 offset-md2>
              <v-text-field
                :label="$t('label.name')"
                v-model="center.name"
                data-vv-name="name"
                :error-messages="errors.collect('name')"
                v-validate="'required'"
              ></v-text-field>
              <v-checkbox
                :label="$t('label.active')"
                v-model="center.active">
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
        center: {
          active: true
        },
        isEditMode: false
      };
    },

    mounted () {
      this.init();
      this.$store.commit('showBack', true);
      this.$events.on(EventTypes.GO_BACK, this.navigateToCenterList);
      this.$events.on(EventTypes.CENTER_ON_SAVE, this.save);
    },

    beforeDestroy () {
      this.$store.commit('showBack', false);
      this.$events.off(EventTypes.GO_BACK, this.navigateToCenterList);
      this.$events.off(EventTypes.CENTER_ON_SAVE, this.save);
    },

    methods: {
      init () {
        this.isEditMode = this.id !== 'new';
        if (this.isEditMode) {
          this.loadCenter();
        } else {
          this.$store.commit('title', this.$t('center.titleNew'));
        }
      },

      async loadCenter () {
        this.center = await this.$store.dispatch('centers/get', this.id);
        this.$store.commit('title', `'${this.center.name}'`);
      },

      async save () {
        let isValid = await this.$validator.validateAll();
        if (isValid) {
          await this.$store.dispatch('centers/save', this.center);
          this.$snackBar.success(this.$t('center.saveSuccess'));
          this.navigateToCenterList();
        }
      },

      navigateToCenterList () {
        this.$router.push({name: 'CenterList'});
      }
    }
  };
</script>
