<template>
  <v-list two-line>
    <template v-for="(question, index) in questions">
      <question-list-mobile-item :question="question" @onSelect="onSelect"></question-list-mobile-item>
      <v-divider v-show="index !== questions.length - 1"></v-divider>
    </template>
  </v-list>
</template>

<script>
  import * as EventTypes from '@/event-types';
  import QuestionListMobileItem from './QuestionListMobileItem';

  export default {
    name: 'question-list-mobile',

    components: {
      QuestionListMobileItem
    },

    props: {
      questions: {
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
      onSelect (question) {
        if (question.selected) {
          this.selected.push(question);
        } else {
          this.selected = this.selected.filter(s => s.id !== question.id);
        }
        this.$emit('onSelect', this.selected);
      },

      clearSelection () {
        this.selected = [];
        this.questions.map((question) => { question.selected = false; });
        this.$emit('onSelect', this.selected);
      }
    }
  };
</script>
