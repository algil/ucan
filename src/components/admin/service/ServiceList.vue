<template>
  <v-card :class="{'card--flex-toolbar': $vuetify.breakpoint.smAndUp}">
    <v-toolbar card color="white" prominent>
      <v-toolbar-title class="body-2 grey--text" v-if="$vuetify.breakpoint.smAndUp">
        {{$store.state.title}}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom v-if="selected.length === 1">
        <v-btn icon slot="activator" @click="edit()">
          <v-icon>mode_edit</v-icon>
        </v-btn>
        <span>Editar</span>
      </v-tooltip>
      <v-tooltip bottom v-if="selected.length > 0">
        <v-btn icon slot="activator" @click="remove()">
          <v-icon>delete</v-icon>
        </v-btn>
        <span>Eliminar</span>
      </v-tooltip>
    </v-toolbar>

    <v-divider></v-divider>

    <v-data-table
      :headers="gridConfig.headers"
      :items="services"
      :pagination.sync="pagination"
      :hide-headers="!services || services.length === 0"
      hide-actions
      v-model="selected"
      select-all
      no-data-text="No hay servicios. Puede añadir servicios pulsando el boton +">
      <tr slot="items" slot-scope="props">
        <td>
          <v-checkbox v-model="props.selected"></v-checkbox>
        </td>
        <td :disabled="props.item.active">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.cost }} €</td>
        <td class="text-xs-center">
          <v-icon v-if="props.item.active">check</v-icon>
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
        :color="$store.getters.accentColor"
        ref="fab"
        @mouseenter="fabTooltip = true"
        @mouseleave="fabTooltip = false"
        @click="add()">
        <v-icon>add</v-icon>
      </v-btn>
      <v-tooltip left :activator="fabButton" v-model="fabTooltip">
        <span>Nuevo servicio</span>
      </v-tooltip>
    </v-card-text>
  </v-card>
</template>

<script>
  import { reject } from 'lodash';

  export default {
    data() {
      return {
        fabButton: null,
        fabTooltip: false,
        selected: [],
        pagination: {
          sortBy: 'cost',
          descending: false
        },
        gridConfig: {
          headers: [
            {text: 'Nombre', value: 'name', align: 'left'},
            {text: 'Precio', value: 'cost', align: 'center'},
            {text: 'Activo', value: 'active', align: 'center'}
          ]
        },
        services: [
          {id: 1, name: 'Servicio 1', cost: 12, active: true},
          {id: 2, name: 'Servicio 2', cost: 24, active: true},
          {id: 3, name: 'Servicio 3', cost: 30, active: false},
          {id: 4, name: 'Servicio 4', cost: 48, active: true}
        ]
      };
    },
    mounted() {
      this.fabButton = this.$refs.fab.$el;
      this.$store.commit('title', 'Servicios');
    },
    methods: {
      add() {
        this.$router.push({name: 'service', params: {id: 'new'}});
      },
      edit() {
        this.$router.push({name: 'service', params: {id: this.selected[0].id}});
      },
      remove() {
        // TODO: Show confirmation dialog
        // TODO: If confirm, delete selected services
        for (let service of this.selected) {
          this.services = reject(this.services, (s) => s.id === service.id);
        }
        this.selected = [];
      }
    }
  };
</script>
