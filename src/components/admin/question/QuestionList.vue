<template>
  <div>
    <!-- DESKTOP -->
    <v-card
      v-if="!isMobile"
      class="card--flex-toolbar">
      <v-toolbar
        card
        color="white"
        prominent>
        <v-toolbar-title class="body-2 grey--text">
          {{$store.state.title}}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <question-list-actions></question-list-actions>
      </v-toolbar>

      <v-divider></v-divider>

      <v-data-table
        :headers="headers"
        :items="questions"
        :pagination.sync="pagination"
        :hide-headers="!questions || questions.length === 0"
        hide-actions
        v-model="selected"
        select-all
        :no-data-text="$t('question.noData')">
        <tr slot="items" slot-scope="props">
          <td>
            <v-checkbox v-model="props.selected"></v-checkbox>
          </td>
          <td>{{ props.item.name }}</td>
          <td class="text-xs-center">{{ props.item.order }}</td>
          <td class="text-xs-center">
            <v-icon v-show="props.item.active">check</v-icon>
          </td>
        </tr>
      </v-data-table>

      <v-card-text class="fab-container">
        <v-btn
          absolute
          dark
          fab
          bottom
          right
          color="accent"
          ref="fab"
          @mouseenter="fabTooltip = true"
          @mouseleave="fabTooltip = false"
          @click="add()">
          <v-icon>add</v-icon>
        </v-btn>

        <v-tooltip
          left
          :activator="fabButton"
          v-model="fabTooltip">
          <span>{{ $t('label.new') }}</span>
        </v-tooltip>
      </v-card-text>
    </v-card>

    <!-- MOBILE -->
    <v-list
      v-else-if="isMobile"
      two-line>
      <template v-for="(question, index) in questions">
        <v-list-tile avatar>
          <v-list-tile-action>
            <v-checkbox
              v-model="question.selected"
              @change="onSelect(question)">
            </v-checkbox>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{question.name}}</v-list-tile-title>
            <v-list-tile-sub-title>{{question.order}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-show="index !== questions.length - 1"></v-divider>
      </template>

      <v-fab-transition>
        <v-btn
          color="accent"
          dark
          fab
          fixed
          bottom
          right
          @click="add()">
          <v-icon>add</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-list>
  </div>
</template>

<script>
  import * as EventTypes from '@/event-types';
  import QuestionListActions from './QuestionListActions';

  export default {
    name: 'question',

    components: {QuestionListActions},

    data () {
      return {
        questions: [],
        selected: [],
        fabButton: null,
        fabTooltip: false,
        headers: [
          {text: this.$t('label.name'), value: 'name', align: 'left', width: '60%'},
          {text: this.$t('label.order'), value: 'order', align: 'center', width: '20%'},
          {text: this.$t('label.active'), value: 'active', align: 'center', width: '20%'}
        ],
        pagination: {
          sortBy: 'order',
          descending: false,
          rowsPerPage: 1000000
        }
      };
    },

    mounted () {
      this.$events.on(EventTypes.QUESTION_LIST_ON_EDIT, this.edit);
      this.$events.on(EventTypes.QUESTION_LIST_DELETE, this.remove);
      this.fabButton = this.$refs.fab ? this.$refs.fab.$el : null;
      this.$store.commit('title', this.$t('question.titleList'));
      this.loadQuestions();
    },

    beforeDestroy () {
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
      onSelect (question) {
        if (question.selected) {
          this.selected.push(question);
        } else {
          this.selected = this.selected.filter(s => s.id !== question.id);
        }
      }
    },

    watch: {
      selected: function (value) {
        this.$events.emit(EventTypes.QUESTION_LIST_ON_SELECT, value);
      }
    }
  };
</script>
