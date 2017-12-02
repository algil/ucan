<template>
  <v-card :class="{'elevation-0 transparent': isMobile}">
    <form>
      <v-container>
        <v-layout column>
          <v-flex xs12 md8 offset-md2>
            <v-text-field
              :label="$t('label.name')"
              v-model="questionCategory.name"
              data-vv-name="name"
              :error-messages="errors.collect('name')"
              v-validate="'required'"
            ></v-text-field>
            <v-text-field
              :label="$t('label.order')"
              type="number"
              v-model="questionCategory.order"
              data-vv-name="order"
              :error-messages="errors.collect('order')"
              v-validate="'required|min_value:1'"
            ></v-text-field>
            <v-checkbox
              :label="$t('label.active')"
              v-model="questionCategory.active">
            </v-checkbox>
          </v-flex>
        </v-layout>
      </v-container>
    </form>
  </v-card>
</template>

<script>
  import * as EventTypes from '@/event-types';

  export default {
    props: {
      id: {
        required: true,
        type: String
      }
    },

    data () {
      return {
        questionCategory: {
          active: true
        },
        isEditMode: false
      };
    },

    mounted () {
      this.init();
      this.$store.commit('showBack', true);
      this.$events.on(EventTypes.GO_BACK, this.navigateToQuestionCategoryList);
      this.$events.on(EventTypes.QUESTION_CATEGORY_ON_SAVE, this.save);
    },

    beforeDestroy () {
      this.$store.commit('showBack', false);
      this.$events.off(EventTypes.GO_BACK, this.navigateToQuestionCategoryList);
      this.$events.off(EventTypes.QUESTION_CATEGORY_ON_SAVE, this.save);
    },

    methods: {
      init () {
        this.isEditMode = this.id !== 'new';
        if (this.isEditMode) {
          this.loadQuestionCategory();
        } else {
          this.$store.commit('title', this.$t('questionCategory.titleNew'));
        }
      },

      async loadQuestionCategory () {
        this.questionCategory = await this.$store.dispatch('questionCategories/get', this.id);
        this.$store.commit('title', `'${this.questionCategory.name}'`);
      },

      async save () {
        let isValid = await this.$validator.validateAll();
        if (isValid) {
          await this.$store.dispatch('questionCategories/save', this.questionCategory);
          this.$snackBar.success(this.$t('questionCategory.saveSuccess'));
          this.navigateToQuestionCategoryList();
        }
      },

      navigateToQuestionCategoryList () {
        this.$router.push({name: 'QuestionCategoryList'});
      }
    }
  };
</script>
