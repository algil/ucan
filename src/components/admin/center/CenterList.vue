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
        <center-list-actions></center-list-actions>
      </v-toolbar>

      <v-divider></v-divider>

      <v-data-table
        :headers="headers"
        :items="centers"
        :pagination.sync="pagination"
        :hide-headers="!centers || centers.length === 0"
        hide-actions
        v-model="selected"
        select-all
        :no-data-text="$t('center.noData')">
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
      <template v-for="(center, index) in centers">
        <v-list-tile avatar>
          <v-list-tile-action>
            <v-checkbox
              v-model="center.selected"
              @change="onSelect(center)">
            </v-checkbox>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{center.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-show="index !== centers.length - 1"></v-divider>
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
  import CenterListActions from './CenterListActions';

  export default {
    name: 'center-list',

    components: {
      CenterListActions
    },

    data () {
      return {
        centers: [],
        selected: [],
        fabButton: null,
        fabTooltip: false,
        headers: [
          {text: this.$t('label.name'), value: 'name', align: 'left', width: '80%'},
          {text: this.$t('label.active'), value: 'active', align: 'center', width: '20%'}
        ],
        pagination: {
          sortBy: 'name',
          descending: false,
          rowsPerPage: 1000000
        }
      };
    },

    mounted () {
      this.$events.on(EventTypes.CENTER_LIST_ON_EDIT, this.edit);
      this.$events.on(EventTypes.CENTER_LIST_DELETE, this.remove);
      this.fabButton = this.$refs.fab ? this.$refs.fab.$el : null;
      this.$store.commit('title', this.$t('center.titleList'));
      this.loadCenters();
    },

    beforeDestroy () {
      this.$events.off(EventTypes.CENTER_LIST_ON_EDIT, this.edit);
      this.$events.off(EventTypes.CENTER_LIST_DELETE, this.remove);
    },

    methods: {
      async loadCenters () {
        this.selected = [];
        this.centers = await this.$store.dispatch('centers/getAll');
      },
      add () {
        this.$router.push({name: 'CenterItem', params: {id: 'new'}});
      },
      edit () {
        this.$router.push({name: 'CenterItem', params: {id: this.selected[0].id}});
      },
      async remove () {
        await this.$store.dispatch('centers/remove', this.selected);
        this.$snackBar.success(this.$tc('center.deleteSuccess', this.selected.length));
        this.loadCenters();
      },
      onSelect (center) {
        if (center.selected) {
          this.selected.push(center);
        } else {
          this.selected = this.selected.filter(s => s.id !== center.id);
        }
      }
    },

    watch: {
      selected: function (value) {
        this.$events.emit(EventTypes.CENTER_LIST_ON_SELECT, value);
      }
    }
  };
</script>
