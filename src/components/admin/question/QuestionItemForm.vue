<template>
  <form>
    <v-container>
      <v-layout column>
        <v-flex xs12 md8 offset-md2>
          <v-text-field
            :label="$t('label.name')"
            v-model="question.name"
            data-vv-name="name"
            :error-messages="errors.collect('name')"
            v-validate="'required'"
            required>
          </v-text-field>
          <v-select
            :items="categories"
            v-model="question.category"
            :label="$t('label.category')"
            item-text="name"
            item-value="id"
            data-vv-name="category"
            :error-messages="errors.collect('category')"
            v-validate="'required'"
          ></v-select>
          <v-text-field
            :label="$t('label.order')"
            type="number"
            v-model="question.order"
            data-vv-name="order"
            :error-messages="errors.collect('order')"
            v-validate="'required|min_value:0'"
            required>
          </v-text-field>
          <v-checkbox
            :label="$t('label.active')"
            v-model="question.active">
          </v-checkbox>
        </v-flex>
      </v-layout>
    </v-container>
  </form>
</template>

<script>
  import * as EventTypes from '@/event-types';

  export default {
    name: 'question-item-form',

    props: {
      question: {
        required: true,
        type: Object
      }
    },

    data () {
      return {
        categories: []
      };
    },

    mounted () {
      this.$events.on(EventTypes.VALIDATE, this.onValidate);
      this.loadCategories();
    },

    beforeDestroy () {
      this.$events.off(EventTypes.VALIDATE, this.onValidate);
    },

    methods: {
      async loadCategories () {
        let categories = await this.$store.dispatch('questionCategories/getAll');
        this.categories = this._.sortBy(categories, (category) => category.order);
      },
      onValidate () {
        this.$validator.validateAll();
        this.$events.emit(EventTypes.ERROR_CHANGES, this.errors.items);
      }
    }
  };
</script>
