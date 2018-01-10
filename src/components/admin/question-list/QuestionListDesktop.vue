<template>
  <v-card>
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
        <td>{{ categoryName(props.item.categoryId) }}</td>
        <td class="text-xs-right">{{ props.item.order }}</td>
        <td class="text-xs-center">
          <v-icon v-show="props.item.active">check</v-icon>
        </td>
      </tr>
    </v-data-table>
  </v-card>
</template>

<script>
  import * as EventTypes from '@/event-types';
  import QuestionListActions from './QuestionListActions';

  export default {
    name: 'question-list-desktop',

    components: {
      QuestionListActions
    },

    props: {
      questions: {
        required: true,
        type: Array
      },
      categories: {
        required: true,
        type: Array
      }
    },

    data () {
      return {
        selected: [],
        headers: [
          {text: this.$t('label.name'), value: 'name', align: 'left', width: '40%'},
          {text: this.$t('label.category'), value: 'categoryId', align: 'left', width: '40%'},
          {text: this.$t('label.order'), value: 'order', align: 'right', width: '10%'},
          {text: this.$t('label.active'), value: 'active', align: 'center', width: '10%'}
        ],
        pagination: {
          sortBy: 'order',
          descending: false,
          rowsPerPage: 1000000
        }
      };
    },

    mounted () {
      this.$events.on(EventTypes.GO_BACK, this.clearSelection);
    },

    beforeDestroy () {
      this.$events.off(EventTypes.GO_BACK, this.clearSelection);
    },

    methods: {
      clearSelection () {
        this.selected = [];
      },
      categoryName (categoryId) {
        return this.categories.find(category => category.id === categoryId).name;
      }
    },

    watch: {
      selected (selected) {
        this.$emit('onSelect', selected);
      }
    }
  };
</script>
