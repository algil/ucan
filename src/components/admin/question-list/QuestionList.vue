<template>
  <div>
    <question-list-desktop
      v-if="!isMobile"
      :questions="questions"
      @onSelect="onSelect">
    </question-list-desktop>

    <question-list-mobile
      v-if="isMobile"
      :questions="questions"
      @onSelect="onSelect">
    </question-list-mobile>

    <v-fab-transition>
      <v-btn
        color="accent"
        dark
        fab
        fixed
        bottom
        right
        ref="fab"
        @mouseenter="fabTooltip = true"
        @mouseleave="fabTooltip = false"
        @click="add()">
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-tooltip
      top
      :activator="fabButton"
      v-model="fabTooltip">
      <span>{{ $t('label.new') }}</span>
    </v-tooltip>
  </div>
</template>

<script>
  import * as EventTypes from '@/event-types';
  import QuestionListDesktop from './QuestionListDesktop';
  import QuestionListMobile from './QuestionListMobile';

  export default {
    name: 'question-list',

    components: {
      QuestionListDesktop,
      QuestionListMobile
    },

    data () {
      return {
        questions: [],
        selected: [],
        fabButton: null,
        fabTooltip: false
      };
    },

    mounted () {
      this.fabButton = this.$refs.fab ? this.$refs.fab.$el : null;
      this.$events.on(EventTypes.GO_BACK, this.clearSelection);
      this.$events.on(EventTypes.QUESTION_LIST_ON_EDIT, this.edit);
      this.$events.on(EventTypes.QUESTION_LIST_DELETE, this.remove);
      this.$store.commit('title', this.$t('question.titleList'));
      this.loadQuestions();
    },

    beforeDestroy () {
      this.$events.off(EventTypes.GO_BACK, this.clearSelection);
      this.$events.off(EventTypes.QUESTION_LIST_ON_EDIT, this.edit);
      this.$events.off(EventTypes.QUESTION_LIST_DELETE, this.remove);
    },

    methods: {
      async loadQuestions () {
        this.selected = [];
        this.questions = await this.$store.dispatch('questions/getAll');
      },

      add () {
        this.$router.push({name: 'QuestionItem', params: {id: 'new'}});
      },

      edit () {
        this.$router.push({name: 'QuestionItem', params: {id: this.selected[0].id}});
      },

      async remove () {
        await this.$store.dispatch('questions/remove', this.selected);
        this.$snackBar.success(this.$tc('question.deleteSuccess', this.selected.length));
        this.loadQuestions();
      },

      onSelect (selected) {
        this.changeSelection(selected);
      },

      clearSelection () {
        this.changeSelection([]);
      },

      changeSelection (selected) {
        this.selected = selected;
        this.$store.commit('showBack', this.selected.length > 0);
        this.$events.emit(EventTypes.QUESTION_LIST_SELECTION_CHANGED, this.selected);
      }
    }
  };
</script>
