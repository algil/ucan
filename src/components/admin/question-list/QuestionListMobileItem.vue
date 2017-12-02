<template>
  <v-list-tile avatar>
    <v-list-tile-action>
      <v-checkbox
        v-model="question.selected"
        @change="onSelect(question)">
      </v-checkbox>
    </v-list-tile-action>

    <v-list-tile-content>
      <v-list-tile-title>{{question.name}}</v-list-tile-title>
      <v-list-tile-sub-title>{{question.cost}} €</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
  export default {
    name: 'question-list-mobile-item',

    props: {
      question: {
        required: true,
        type: Object
      }
    },

    methods: {
      onSelect (question) {
        this.$emit('onSelect', this.question);
      }
    }
  }
</script>
