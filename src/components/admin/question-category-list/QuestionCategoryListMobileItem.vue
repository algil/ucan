<template>
  <v-list-tile avatar>
    <v-list-tile-action>
      <v-checkbox
        v-model="questionCategory.selected"
        @change="onSelect(questionCategory)">
      </v-checkbox>
    </v-list-tile-action>

    <v-list-tile-content>
      <v-list-tile-title>{{questionCategory.name}}</v-list-tile-title>
      <v-list-tile-sub-title>{{questionCategory.cost}} €</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
  export default {
    name: 'question-category-list-mobile-item',

    props: {
      questionCategory: {
        required: true,
        type: Object
      }
    },

    methods: {
      onSelect () {
        this.$emit('onSelect', this.questionCategory);
      }
    }
  }
</script>
