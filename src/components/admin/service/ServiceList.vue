<template>
  <div>
    <v-form v-if="service">
      <v-container>
        <v-layout column>
          <v-flex xs12 md4 offset-md4 class="pa-4 elevation-1">
            <v-text-field label="Nombre" v-model="service.name" required></v-text-field>
            <v-text-field label="Precio" type="number" v-model="service.cost" suffix="€" required></v-text-field>
            <v-switch label="Activo" v-model="service.active"></v-switch>

            <!-- Actions -->
            <div class="text-xs-right">
              <v-btn @click="cancel()">
                <span>Cancel</span>
              </v-btn>
              <v-btn color="blue" dark @click="save()">
                <span>Save</span>
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>

    <v-data-table
      :headers="gridConfig.headers"
      :items="services"
      :pagination.sync="pagination"
      hide-actions
      v-model="selected"
      class="elevation-0">
      <template slot="items" scope="props" >
        <tr :class="{isDisabled: !props.item.active}">
        <td class="hidden-sm-and-up">
          {{ props.item.name }}<br>
          {{ props.item.cost }}<br>
        </td>
        <td class="hidden-xs-only">{{ props.item.name }}</td>
        <td class="text-xs-center hidden-xs-only">{{ props.item.cost }}</td>
        <td class="text-xs-center" style="width: 250px">
          <v-btn flat icon @click="editService(props.item)">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn flat icon @click="deleteService(props.item.id)">
            <v-icon>delete</v-icon>
          </v-btn>
        </td>
        </tr>
      </template>
    </v-data-table>

    <v-snackbar :timeout="snackBar.timeout" :color="snackBar.color" v-model="snackBar.show">
      {{ snackBar.text }}
      <v-btn dark flat @click.native="snackBar.show = false">Cerrar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import {cloneDeep} from 'lodash';

  export default {
    name: 'service-list',
    data() {
      return {
        snackBar: {
          text: '',
          color: null,
          show: false,
          timeout: 3000
        },
        service: null,
        selected: [],
        pagination: {
          sortBy: 'cost',
          descending: false
        },
        gridConfig: {
          headers: [
            {text: 'Nombre', value: 'name', align: 'left'},
            {text: 'Precio', value: 'cost', align: 'center'}
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
    computed: {
      activeServices() {
        return this.services.filter((service) => service.active);
      }
    },
    methods: {
      cancel() {
        this.service = null;
      },
      save() {
        let index = this.services.findIndex(service => service.id === this.service.id);
        if (index !== -1) {
          this.$set(this.services, index, this.service);
        } else {
          this.services.push(this.service);
        }
        this.service = null;
        this.showSaveSuccessToast();
      },
      editService(service) {
        this.service = cloneDeep(service);
      },
      deleteService(id) {
        // TODO: Modal dialog to confirm delete action
        this.services = this.services.filter(service => service.id !== id);
      },
      showSaveSuccessToast() {
        this.snackBar.text = 'Servicio guardado con éxito';
        this.snackBar.color = 'success';
        this.snackBar.show = true;
      }
    }
  };
</script>

<style>
  .isDisabled {
    background: gray;
  }
</style>
