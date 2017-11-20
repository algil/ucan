<template>
  <form>
    <v-container>
      <v-layout column>
        <v-flex xs12 md8 offset-md2>
          <v-text-field
            :label="$t('label.name')"
            v-model="questionCategory.name"
            data-vv-name="name"
            :error-messages="errors.collect('name')"
            v-validate="'required'"
            required>
          </v-text-field>
          <v-checkbox
            :label="$t('label.active')"
            v-model="questionCategory.active">
          </v-checkbox>
        </v-flex>
      </v-layout>
    </v-container>
  </form>
</template>

<script>
  import * as EventTypes from '@/event-types';

  export default {
    name: 'question-category-item-form',

    props: {
      questionCategory: {
        required: true,
        type: Object
      }
    },

    mounted () {
      this.$events.on(EventTypes.VALIDATE, this.onValidate);
    },

    beforeDestroy () {
      this.$events.off(EventTypes.VALIDATE, this.onValidate);
    },

    methods: {
      onValidate () {
        this.$validator.validateAll();
        this.$events.emit(EventTypes.ERROR_CHANGES, this.errors.items);
      }
    }
  };
</script>
