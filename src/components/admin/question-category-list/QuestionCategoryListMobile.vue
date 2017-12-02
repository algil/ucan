<template>
  <v-list two-line>
    <template v-for="(questionCategory, index) in questionCategories">
      <question-category-list-mobile-item :question-category="questionCategory" @onSelect="onSelect"></question-category-list-mobile-item>
      <v-divider v-show="index !== questionCategories.length - 1"></v-divider>
    </template>
  </v-list>
</template>

<script>
  import * as EventTypes from '@/event-types';
  import QuestionCategoryListMobileItem from './QuestionCategoryListMobileItem';

  export default {
    name: 'question-category-list-mobile',

    components: {
      QuestionCategoryListMobileItem
    },

    props: {
      questionCategories: {
        required: true,
        type: Array
      }
    },

    data () {
      return {
        selected: [],
        fabButton: null
      };
    },

    mounted () {
      this.fabButton = this.$refs.fab ? this.$refs.fab.$el : null;
      this.$events.on(EventTypes.GO_BACK, this.clearSelection);
    },

    beforeDestroy () {
      this.$events.off(EventTypes.GO_BACK, this.clearSelection);
    },

    methods: {
      onSelect (questionCategory) {
        if (questionCategory.selected) {
          this.selected.push(questionCategory);
        } else {
          this.selected = this.selected.filter(s => s.id !== questionCategory.id);
        }
        this.$emit('onSelect', this.selected);
      },

      clearSelection () {
        this.selected = [];
        this.questionCategories.map((questionCategory) => { questionCategory.selected = false });
        this.$emit('onSelect', this.selected);
      }
    }
  };
</script>
