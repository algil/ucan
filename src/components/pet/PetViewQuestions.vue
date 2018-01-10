<template>
  <v-tabs v-model="activeTab" grow>
    <v-tab
      v-for="category in categoriesSorted"
      :key="category.id"
      :href="'#' + category.id"
      ripple
    >
      {{category.name}}
    </v-tab>

    <v-tabs-items v-model="activeTab">
      <v-tab-item
        v-for="category in categoriesSorted"
        :key="category.id"
        :id="category.id"
      >
        <v-card flat class="pt-0 pb-2 px-2">
          <v-card-text>
            <v-layout row wrap>
              <template v-for="question in questionsByCategoryId(category.id)">
                <v-flex xs12>
                  <v-text-field
                    :name="question.name"
                    :label="question.name"
                    :id="question.id"
                    v-model="petAnswers[question.id]"
                    hide-details
                  ></v-text-field>
                </v-flex>
              </template>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>

<script>
  import * as EventTypes from '@/event-types';

  export default {
    name: 'pet-view-questions',

    props: {
      pet: {
        required: true,
        type: Object
      }
    },

    data () {
      return {
        activeTab: null,
        categories: [],
        questions: {},
        petAnswers: {}
      };
    },

    computed: {
      categoriesSorted () {
        return this._.sortBy(this.categories, (category) => category.order);
      }
    },

    mounted () {
      this.$events.on(EventTypes.FORM_ON_SAVE, this.save);
      this.loadCategories();
    },

    beforeDestroy () {
      this.$events.off(EventTypes.FORM_ON_SAVE, this.save);
    },

    methods: {
      async loadCategories () {
        this.categories = await this.$store.dispatch('questionCategories/getAll');
        this.activeTab = this.categoriesSorted[0].id;
        this.loadQuestions();
      },

      async loadQuestions () {
        let questions = await this.$store.dispatch('questions/getAll');
        this.questions = this._.groupBy(questions, (question) => question.categoryId);
        this.petAnswers = this.pet.answers;
      },

      questionsByCategoryId (categoryId) {
        return this._.sortBy(this.questions[categoryId], (question) => question.order);
      },

      async save () {
        this.pet.answers = this.petAnswers;
      }
    }
  };
</script>
