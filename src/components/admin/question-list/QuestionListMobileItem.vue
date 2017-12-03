<template>
  <v-list-tile avatar>
    <v-list-tile-action>
      <v-checkbox
        v-model="question.selected"
        @change="onSelect">
      </v-checkbox>
    </v-list-tile-action>

    <v-list-tile-content @click="edit">
      <v-list-tile-title>{{question.name}}</v-list-tile-title>
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
      onSelect () {
        this.$emit('onSelect', this.question);
      },

      edit () {
        this.$router.push({name: 'QuestionItem', params: {id: this.question.id}});
      }
    }
  }
</script>
