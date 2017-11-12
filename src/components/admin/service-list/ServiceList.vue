<template>
  <div>
    <v-card v-if="!isMobile" class="card--flex-toolbar">
      <v-toolbar card color="white" prominent>
        <v-toolbar-title class="body-2 grey--text">{{$store.state.title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <service-list-actions></service-list-actions>
      </v-toolbar>

      <v-divider></v-divider>

      <v-data-table
        :headers="gridConfig.headers"
        :items="services"
        :pagination.sync="gridConfig.pagination"
        :hide-headers="!services || services.length === 0"
        hide-actions
        v-model="selected"
        select-all
        no-data-text="There are not services. You can add a new service with 'New' button">
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
        <v-tooltip left :activator="fabButton" v-model="fabTooltip">
          <span>New</span>
        </v-tooltip>
      </v-card-text>
    </v-card>

    <v-list two-line v-else-if="isMobile">
      <template v-for="(service, index) in services">
        <v-list-tile avatar>
          <v-list-tile-action>
            <v-checkbox v-model="service.selected" @change="onSelect(service)"></v-checkbox>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{service.name}}</v-list-tile-title>
            <v-list-tile-sub-title>{{service.cost}} €</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-show="index !== services.length - 1"></v-divider>
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
  import ServiceListActions from './ServiceListActions.vue';
  import * as EventTypes from '../../../event-types';
  import gridConfig from './grid-config';

  export default {
    name: 'service-list',
    components: {ServiceListActions},
    data() {
      return {
        services: [],
        selected: [],
        fabButton: null,
        fabTooltip: false,
        gridConfig: gridConfig
      };
    },
    mounted() {
      this.$events.on(EventTypes.SERVICE_LIST_ON_EDIT, this.edit);
      this.$events.on(EventTypes.SERVICE_LIST_DELETE, this.remove);
      this.fabButton = this.$refs.fab ? this.$refs.fab.$el : null;
      this.$store.commit('title', 'Services');
      this.loadServices();
    },
    beforeDestroy() {
      this.$events.off(EventTypes.SERVICE_LIST_ON_EDIT, this.edit);
      this.$events.off(EventTypes.SERVICE_LIST_DELETE, this.remove);
    },
    methods: {
      async loadServices() {
        this.selected = [];
        this.services = await this.$store.dispatch('services/getAll');
      },
      add() {
        this.$router.push({name: 'service-item', params: {id: 'new'}});
      },
      edit() {
        this.$router.push({name: 'service-item', params: {id: this.selected[0].id}});
      },
      async remove() {
        await this.$store.dispatch('services/remove', this.selected);
        this.$snackBar.show('Service/s deleted');
        this.loadServices();
      },
      onSelect(service) {
        if (service.selected) {
          this.selected.push(service);
        } else {
          this.selected = this.selected.filter(s => s.id !== service.id);
        }
      }
    },
    watch: {
      selected: function (value) {
        this.$events.emit(EventTypes.SERVICE_LIST_ON_SELECT, value);
      }
    }
  };
</script>
