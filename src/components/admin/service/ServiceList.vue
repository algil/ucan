<template>
  <v-card :class="{'card--flex-toolbar': $vuetify.breakpoint.smAndUp}">
    <v-toolbar card color="white" prominent>
      <v-toolbar-title class="body-2 grey--text" v-if="$vuetify.breakpoint.smAndUp">
        {{$store.state.title}}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom v-show="selected.length === 1">
        <v-btn icon slot="activator" @click="edit()">
          <v-icon>mode_edit</v-icon>
        </v-btn>
        <span>Editar</span>
      </v-tooltip>
      <v-tooltip bottom v-show="selected.length > 0">
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
  export default {
    data() {
      return {
        services: [],
        selected: [],
        fabButton: null,
        fabTooltip: false,
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
        }
      };
    },
    mounted() {
      this.fabButton = this.$refs.fab.$el;
      this.$store.commit('title', 'Servicios');
      this.loadServices();
    },
    methods: {
      async loadServices() {
        this.selected = [];
        this.services = await this.$store.dispatch('services/getAll');
      },
      add() {
        this.$router.push({name: 'service', params: {id: 'new'}});
      },
      edit() {
        this.$router.push({name: 'service', params: {id: this.selected[0].id}});
      },
      async remove() {
        // TODO: Show confirmation dialog
        // TODO: If confirm, delete selected services
        await this.$store.dispatch('services/remove', this.selected);
        this.loadServices();
      }
    }
  };
</script>
