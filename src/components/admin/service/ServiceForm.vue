<template>
  <v-card :class="{'card--flex-toolbar': $vuetify.breakpoint.smAndUp}">
    <v-toolbar card color="white" prominent>
      <v-tooltip bottom>
        <v-btn icon slot="activator" @click="navigateToServiceList()">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <span>Volver</span>
      </v-tooltip>

      <v-toolbar-title class="body-2 grey--text" v-if="$vuetify.breakpoint.smAndUp">
        {{$store.state.title}}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <v-btn icon slot="activator" @click="navigateToServiceList()">
          <v-icon>clear</v-icon>
        </v-btn>
        <span>Cancelar</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn icon slot="activator" @click="save()">
          <v-icon>check</v-icon>
        </v-btn>
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
    props: ['id'],
    data() {
      return {
        service: {},
        isEditMode: false
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.isEditMode = this.id !== 'new';
        if (this.isEditMode) {
          this.loadService();
        } else {
          this.$store.commit('title', 'Nuevo Servicio');
        }
      },
      async loadService() {
        this.service = await this.$store.dispatch('services/get', this.id);
        this.$store.commit('title', `Editando servicio '${this.service.name}'`);
      },
      navigateToServiceList() {
        this.$router.push({name: 'service-list'});
      },
      cancel() {
        this.navigateToServiceList();
      },
      async save() {
        await this.$store.dispatch('services/save', this.service);
        this.$router.push({name: 'service-list'});
      }
    }
  };
</script>
