<template>
  <v-card class="card--flex-toolbar">
    <!-- TODO: Move to a new component ServiceListDesktopToolbar -->
    <v-toolbar
      card
      prominent>
      <v-toolbar-title class="body-2 grey--text">
        {{$store.state.title}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <service-list-actions></service-list-actions>
    </v-toolbar>

    <v-divider></v-divider>

    <v-data-table
      :headers="headers"
      :items="services"
      :pagination.sync="pagination"
      :hide-headers="!services || services.length === 0"
      hide-actions
      v-model="selected"
      select-all
      :no-data-text="$t('service.noData')">
      <tr slot="items" slot-scope="props">
        <td>
          <v-checkbox v-model="props.selected"></v-checkbox>
        </td>
        <td>{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.cost }} €</td>
        <td class="text-xs-center">
          <v-icon v-show="props.item.active">check</v-icon>
        </td>
      </tr>
    </v-data-table>
  </v-card>
</template>

<script>
  import ServiceListActions from './ServiceListActions';

  export default {
    name: 'service-list-desktop',

    components: {
      ServiceListActions
    },

    props: {
      services: {
        required: true,
        type: Array
      }
    },

    data () {
      return {
        selected: [],
        headers: [
          {text: this.$t('label.name'), value: 'name', align: 'left', width: '60%'},
          {text: this.$t('label.cost'), value: 'cost', align: 'center', width: '20%'},
          {text: this.$t('label.active'), value: 'active', align: 'center', width: '20%'}
        ],
        pagination: {
          sortBy: 'cost',
          descending: false,
          rowsPerPage: 1000000
        }
      };
    },

    watch: {
      selected (selected) {
        this.$emit('onSelect', selected);
      }
    }
  };
</script>
