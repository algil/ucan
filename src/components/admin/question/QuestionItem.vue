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
            @click.stop="navigateToQuestionList">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <span>{{ $t('label.back') }}</span>
        </v-tooltip>

        <v-toolbar-title class="body-2 grey--text">
          {{$store.state.title}}
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <question-item-actions></question-item-actions>
      </v-toolbar>
      <v-divider></v-divider>

      <!-- FORM -->
      <question-item-form :question="question"></question-item-form>
    </v-card>

    <!-- MOBILE -->
    <question-item-form
      v-if="isMobile"
      :question="question">
    </question-item-form>
  </div>
</template>

<script>
  import * as EventTypes from '@/event-types';
  import QuestionItemActions from './QuestionItemActions';
  import QuestionItemForm from './QuestionItemForm';

  export default {
    props: {
      id: {
        required: true,
        type: String
      }
    },

    components: {
      QuestionItemActions,
      QuestionItemForm
    },

    data () {
      return {
        question: {
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
      this.$events.on(EventTypes.GO_BACK, this.navigateToQuestionList);
      this.$events.on(EventTypes.QUESTION_ON_SAVE, this.save);
      this.$events.on(EventTypes.ERROR_CHANGES, this.refreshErrors);
    },

    beforeDestroy () {
      this.$store.commit('showBack', false);
      this.$events.off(EventTypes.GO_BACK, this.navigateToQuestionList);
      this.$events.off(EventTypes.QUESTION_ON_SAVE, this.save);
      this.$events.off(EventTypes.ERROR_CHANGES, this.refreshErrors);
    },

    methods: {
      init () {
        this.isEditMode = this.id !== 'new';
        if (this.isEditMode) {
          this.loadQuestion();
        } else {
          this.$store.commit('title', this.$t('question.titleNew'));
        }
      },
      async loadQuestion () {
        this.question = await this.$store.dispatch('questions/get', this.id);
        this.$store.commit('title', `'${this.question.name}'`);
      },
      async save () {
        this.$events.emit(EventTypes.VALIDATE);
        if (!this.errors.any()) {
          await this.$store.dispatch('questions/save', this.question);
          this.$snackBar.success(this.$t('question.saveSuccess'));
          this.navigateToQuestionList();
        }
      },
      navigateToQuestionList () {
        this.$router.push({name: 'QuestionList'});
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
