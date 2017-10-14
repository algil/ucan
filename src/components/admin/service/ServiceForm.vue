<template>
  <v-card :class="{'card--flex-toolbar': $vuetify.breakpoint.smAndUp}">
    <v-toolbar card color="white" prominent>
      <v-tooltip bottom>
        <v-btn icon slot="activator" @click="navigateToServiceList()"><v-icon>arrow_back</v-icon></v-btn>
        <span>Volver</span>
      </v-tooltip>

      <v-toolbar-title class="body-2 grey--text"  v-if="$vuetify.breakpoint.smAndUp">
        {{$store.state.title}}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <v-btn icon slot="activator" @click="navigateToServiceList()"><v-icon>clear</v-icon></v-btn>
        <span>Cancelar</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn icon slot="activator" @click="save()"><v-icon>check</v-icon></v-btn>
        <span>Guardar</span>
      </v-tooltip>
    </v-toolbar>

    <v-divider></v-divider>

    <v-form>
      <v-container>
        <v-layout column>
          <v-flex xs12 md8 offset-md2>
            <v-text-field label="Nombre" v-model="service.name" required></v-text-field>
            <v-text-field label="Precio" type="number" v-model="service.cost" suffix="€" required></v-text-field>
            <v-checkbox label="Activo" v-model="service.active"></v-checkbox>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-card>

</template>


<script>
  export default {
    name: 'service-form',
    data: function () {
      return {
        service: {},
        isEditMode: false,
        services: [
          {id: 1, name: 'Servicio 1', cost: 12, active: true},
          {id: 2, name: 'Servicio 2', cost: 24, active: true},
          {id: 3, name: 'Servicio 3', cost: 30, active: false},
          {id: 4, name: 'Servicio 4', cost: 48, active: true}
        ]
      };
    },
    created: function () {
      this.init();
    },
    methods: {
      init: function () {
        this.loadParams();
        if (this.isEditMode) {
          this.loadService();
        } else {
          this.$store.commit('title', 'Nuevo Servicio');
        }
      },
      loadParams: function () {
        let serviceId = this.$route.params.id;
        this.isEditMode = serviceId !== 'new';
      },
      loadService: function() {
        // TODO: Load service from firebase
        console.log('loading service');
        this.service = {id: 1, name: 'Servicio 1', cost: 12, active: true};
        this.$store.commit('title', `Editando servicio '${this.service.id}'`);
      },
      navigateToServiceList: function () {
        this.$router.push({name: 'service-list'});
      },
      cancel: function () {
        this.navigateToServiceList();
      },
      save: function () {
        // TODO: Save service to firebase
        this.$router.push({name: 'service-list'});
      }
    },
    watch: {
      '$route': function () {
        this.init();
      }
    }
  };
</script>

<style lang="stylus">

  .card--flex-toolbar {
    margin-top: -80px;
  }
</style>
