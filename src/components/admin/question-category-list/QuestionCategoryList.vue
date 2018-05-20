<template>
  <div>
    <question-category-list-desktop
      v-if="!isMobile"
      :question-categories="questionCategories"
      @onSelect="onSelect">
    </question-category-list-desktop>

    <question-category-list-mobile
      v-if="isMobile"
      :question-categories="questionCategories"
      @onSelect="onSelect">
    </question-category-list-mobile>

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
import * as EventTypes from '@/event-types'
import QuestionCategoryListDesktop from './QuestionCategoryListDesktop'
import QuestionCategoryListMobile from './QuestionCategoryListMobile'

export default {
  name: 'question-category-list',

  components: {
    QuestionCategoryListDesktop,
    QuestionCategoryListMobile
  },

  data () {
    return {
      questionCategories: [],
      selected: [],
      fabButton: null,
      fabTooltip: false
    }
  },

  mounted () {
    this.fabButton = this.$refs.fab ? this.$refs.fab.$el : null
    this.$events.on(EventTypes.GO_BACK, this.clearSelection)
    this.$events.on(EventTypes.QUESTION_CATEGORY_LIST_ON_EDIT, this.edit)
    this.$events.on(EventTypes.QUESTION_CATEGORY_LIST_DELETE, this.remove)
    this.$store.commit('title', this.$t('questionCategory.titleList'))
    this.loadQuestionCategories()
  },

  beforeDestroy () {
    this.$events.off(EventTypes.GO_BACK, this.clearSelection)
    this.$events.off(EventTypes.QUESTION_CATEGORY_LIST_ON_EDIT, this.edit)
    this.$events.off(EventTypes.QUESTION_CATEGORY_LIST_DELETE, this.remove)
  },

  methods: {
    async loadQuestionCategories () {
      this.selected = []
      this.questionCategories = await this.$store.dispatch('questionCategories/getAll')
    },

    add () {
      this.$router.push({name: 'QuestionCategoryItem', params: {id: 'new'}})
    },

    edit () {
      this.$router.push({name: 'QuestionCategoryItem', params: {id: this.selected[0].id}})
    },

    async remove () {
      await this.$store.dispatch('questionCategories/remove', this.selected)
      this.$snackBar.success(this.$tc('questionCategory.deleteSuccess', this.selected.length))
      this.loadQuestionCategories()
    },

    onSelect (selected) {
      this.changeSelection(selected)
    },

    clearSelection () {
      this.changeSelection([])
    },

    changeSelection (selected) {
      this.selected = selected
      this.$store.commit('showBack', this.selected.length > 0)
      this.$events.emit(EventTypes.QUESTION_CATEGORY_LIST_SELECTION_CHANGED, this.selected)
    }
  }
}
</script>
