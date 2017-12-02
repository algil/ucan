<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="questionCategories"
      :pagination.sync="pagination"
      :hide-headers="!questionCategories || questionCategories.length === 0"
      hide-actions
      v-model="selected"
      select-all
      :no-data-text="$t('questionCategory.noData')">
      <tr slot="items" slot-scope="props">
        <td>
          <v-checkbox v-model="props.selected"></v-checkbox>
        </td>
        <td>{{ props.item.name }}</td>
        <td class="text-xs-center">
          <v-icon v-show="props.item.active">check</v-icon>
        </td>
      </tr>
    </v-data-table>
  </v-card>
</template>

<script>
  import * as EventTypes from '@/event-types';
  import QuestionCategoryListActions from './QuestionCategoryListActions';

  export default {
    name: 'question-category-list-desktop',

    components: {
      QuestionCategoryListActions
    },

    props: {
      questionCategories: {
        required: true,
        type: Array
      }
    },

    data () {
      return {
        selected: [],
        headers: [
          {text: this.$t('label.name'), value: 'name', align: 'left', width: '80%'},
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
      this.$events.on(EventTypes.GO_BACK, this.clearSelection);
    },

    beforeDestroy () {
      this.$events.off(EventTypes.GO_BACK, this.clearSelection);
    },

    methods: {
      clearSelection () {
        this.selected = [];
      }
    },

    watch: {
      selected (selected) {
        this.$emit('onSelect', selected);
      }
    }
  };
</script>
