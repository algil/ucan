<template>
  <v-list-tile avatar>
    <v-list-tile-action>
      <v-checkbox
        v-model="questionCategory.selected"
        @change="onSelect">
      </v-checkbox>
    </v-list-tile-action>

    <v-list-tile-content @click="edit">
      <v-list-tile-title>{{questionCategory.name}}</v-list-tile-title>
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
      this.$emit('onSelect', this.questionCategory)
    },

    edit () {
      this.$router.push({name: 'QuestionCategoryItem', params: {id: this.questionCategory.id}})
    }
  }
}
</script>
