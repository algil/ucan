<template>
  <div>
    <!-- DESKTOP -->
    <v-card
      v-if="!isMobile"
      class="card--flex-toolbar">

      <!-- TOOLBAR -->
      <v-toolbar
        card
        color="white"
        prominent>

        <v-tooltip bottom>
          <v-btn
            icon
            slot="activator"
            @click.stop="navigateToQuestionCategoryList">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <span>{{ $t('label.back') }}</span>
        </v-tooltip>

        <v-toolbar-title class="body-2 grey--text">
          {{$store.state.title}}
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <question-category-item-actions></question-category-item-actions>
      </v-toolbar>
      <v-divider></v-divider>

      <!-- FORM -->
      <question-category-item-form :questionCategory="questionCategory"></question-category-item-form>
    </v-card>

    <!-- MOBILE -->
    <question-category-item-form
      v-if="isMobile"
      :questionCategory="questionCategory">
    </question-category-item-form>
  </div>
</template>

<script>
  import * as EventTypes from '@/event-types';
  import QuestionCategoryItemActions from './QuestionCategoryItemActions';
  import QuestionCategoryItemForm from './QuestionCategoryItemForm';

  export default {
    props: {
      id: {
        required: true,
        type: String
      }
    },

    components: {
      QuestionCategoryItemActions,
      QuestionCategoryItemForm
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
      if (this.isMobile) {
        this.$store.commit('showBack', true);
      }
      this.$events.on(EventTypes.GO_BACK, this.navigateToQuestionCategoryList);
      this.$events.on(EventTypes.QUESTION_CATEGORY_ON_SAVE, this.save);
      this.$events.on(EventTypes.ERROR_CHANGES, this.refreshErrors);
    },

    beforeDestroy () {
      this.$store.commit('showBack', false);
      this.$events.off(EventTypes.GO_BACK, this.navigateToQuestionCategoryList);
      this.$events.off(EventTypes.QUESTION_CATEGORY_ON_SAVE, this.save);
      this.$events.off(EventTypes.ERROR_CHANGES, this.refreshErrors);
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
        this.$events.emit(EventTypes.VALIDATE);
        if (!this.errors.any()) {
          await this.$store.dispatch('questionCategories/save', this.questionCategory);
          this.$snackBar.success(this.$t('questionCategory.saveSuccess'));
          this.navigateToQuestionCategoryList();
        }
      },
      navigateToQuestionCategoryList () {
        this.$router.push({name: 'QuestionCategoryList'});
      },
      refreshErrors (errors) {
        this.errors.clear();
        errors.forEach(({field, msg, rule, scope}) => {
          this.errors.add(field, msg, rule, scope);
        });
      }
    }
  };
</script>
