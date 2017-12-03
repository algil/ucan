<template>
  <div>
    <v-select
      class="pl-2 pr-2"
      :items="categories"
      v-model="categoryId"
      item-text="name"
      item-value="id"
      :placeholder="$t('question.selectACategory')"
      single-line
      clearable
    ></v-select>

    <question-list-desktop
      v-if="!isMobile"
      :questions="filteredQuestions"
      :categories="categories"
      @onSelect="onSelect">
    </question-list-desktop>

    <question-list-mobile
      v-if="isMobile"
      :questions="filteredQuestions"
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
        categories: [],
        questions: [],
        selected: [],
        categoryId: null,
        fabButton: null,
        fabTooltip: false
      };
    },

    computed: {
      filteredQuestions () {
        return this.categoryId
          ? this.questions.filter(question => question.categoryId === this.categoryId)
          : this.questions;
      }
    },

    mounted () {
      this.fabButton = this.$refs.fab ? this.$refs.fab.$el : null;
      this.$events.on(EventTypes.GO_BACK, this.clearSelection);
      this.$events.on(EventTypes.QUESTION_LIST_ON_EDIT, this.edit);
      this.$events.on(EventTypes.QUESTION_LIST_DELETE, this.remove);
      this.$store.commit('title', this.$t('question.titleList'));
      this.loadCategories();
      this.loadQuestions();
    },

    beforeDestroy () {
      this.$events.off(EventTypes.GO_BACK, this.clearSelection);
      this.$events.off(EventTypes.QUESTION_LIST_ON_EDIT, this.edit);
      this.$events.off(EventTypes.QUESTION_LIST_DELETE, this.remove);
    },

    methods: {
      async loadCategories () {
        this.categories = await this.$store.dispatch('questionCategories/getAll');
      },

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
