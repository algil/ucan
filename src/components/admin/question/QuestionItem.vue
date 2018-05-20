<template>
  <v-card :class="{'elevation-0 transparent': isMobile}">
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
            ></v-text-field>
            <v-select
              :items="categories"
              v-model="question.categoryId"
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
            ></v-text-field>
            <v-checkbox
              :label="$t('label.active')"
              v-model="question.active">
            </v-checkbox>
          </v-flex>
        </v-layout>
      </v-container>
    </form>
  </v-card>
</template>

<script>
import * as EventTypes from '@/event-types'

export default {
  props: {
    id: {
      required: true,
      type: String
    }
  },

  data () {
    return {
      question: {
        active: true
      },
      categories: [],
      isEditMode: false
    }
  },

  mounted () {
    this.init()
    this.$store.commit('showBack', true)
    this.$events.on(EventTypes.GO_BACK, this.navigateToQuestionList)
    this.$events.on(EventTypes.QUESTION_ON_SAVE, this.save)
  },

  beforeDestroy () {
    this.$store.commit('showBack', false)
    this.$events.off(EventTypes.GO_BACK, this.navigateToQuestionList)
    this.$events.off(EventTypes.QUESTION_ON_SAVE, this.save)
  },

  methods: {
    init () {
      this.isEditMode = this.id !== 'new'
      this.loadCategories()
      if (this.isEditMode) {
        this.loadQuestion()
      } else {
        this.$store.commit('title', this.$t('question.titleNew'))
      }
    },

    async loadQuestion () {
      this.question = await this.$store.dispatch('questions/get', this.id)
      this.$store.commit('title', `'${this.question.name}'`)
    },

    async loadCategories () {
      let categories = await this.$store.dispatch('questionCategories/getAll')
      this.categories = this._.sortBy(categories, (category) => category.order)
    },

    async save () {
      let isValid = await this.$validator.validateAll()
      if (isValid) {
        await this.$store.dispatch('questions/save', this.question)
        this.$snackBar.success(this.$t('question.saveSuccess'))
        this.navigateToQuestionList()
      }
    },

    navigateToQuestionList () {
      this.$router.push({name: 'QuestionList'})
    }
  }
}
</script>
