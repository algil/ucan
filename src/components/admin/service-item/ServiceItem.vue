<template>
  <div>
    <!-- DESKTOP -->
    <v-card v-show="!isMobile" class="card--flex-toolbar">
      <!-- TOOLBAR -->
      <v-toolbar card color="white" prominent>
        <v-btn icon @click.stop="navigateToServiceList"><v-icon>arrow_back</v-icon></v-btn>
        <v-toolbar-title class="body-2 grey--text">{{$store.state.title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <service-item-actions></service-item-actions>
      </v-toolbar>
      <v-divider></v-divider>

      <!-- FORM -->
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

    <!-- MOBILE -->
    <v-form v-show="isMobile">
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
  </div>
</template>

<script>
  import ServiceItemActions from './ServiceItemActions.vue';
  import * as EventTypes from '../../../event-types';

  export default {
    props: ['id'],
    components: {
      ServiceItemActions
    },
    data() {
      return {
        service: {
          active: true
        },
        isEditMode: false
      };
    },
    mounted() {
      this.init();
      if (this.isMobile) {
        this.$store.commit('showBack', true);
      }
      this.$events.on(EventTypes.GO_BACK, this.navigateToServiceList);
      this.$events.on(EventTypes.SERVICE_ON_SAVE, this.save);
    },
    beforeDestroy() {
      this.$store.commit('showBack', false);
      this.$events.off(EventTypes.GO_BACK, this.navigateToServiceList);
      this.$events.off(EventTypes.SERVICE_ON_SAVE, this.save);
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
        this.$store.commit('title', `'${this.service.name}'`);
      },
      async save() {
        // TODO: Validate form
        await this.$store.dispatch('services/save', this.service);
        this.navigateToServiceList();
      },
      navigateToServiceList() {
        this.$router.push({name: 'service-list'});
      }
    }
  };
</script>
