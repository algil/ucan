<template>
  <div>
    <!-- DESKTOP -->
    <v-card v-if="!isMobile" class="card--flex-toolbar">
      <!-- TOOLBAR -->
      <v-toolbar card color="white" prominent>
        <v-tooltip bottom>
          <v-btn icon slot="activator" @click.stop="navigateToServiceList">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <span>Back</span>
        </v-tooltip>
        <v-toolbar-title class="body-2 grey--text">{{$store.state.title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <service-item-actions></service-item-actions>
      </v-toolbar>
      <v-divider></v-divider>

      <!-- FORM -->
      <service-item-form :service="service"></service-item-form>
    </v-card>

    <!-- MOBILE -->
    <service-item-form v-if="isMobile" :service="service"></service-item-form>
  </div>
</template>

<script>
  import ServiceItemActions from './ServiceItemActions.vue';
  import ServiceItemForm from './ServiceItemForm.vue';
  import * as EventTypes from '../../../event-types';

  export default {
    props: ['id'],
    components: {
      ServiceItemActions,
      ServiceItemForm
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
      this.$events.on(EventTypes.ERROR_CHANGES, this.refreshErrors);
    },
    beforeDestroy() {
      this.$store.commit('showBack', false);
      this.$events.off(EventTypes.GO_BACK, this.navigateToServiceList);
      this.$events.off(EventTypes.SERVICE_ON_SAVE, this.save);
      this.$events.off(EventTypes.ERROR_CHANGES, this.refreshErrors);
    },
    methods: {
      init() {
        this.isEditMode = this.id !== 'new';
        if (this.isEditMode) {
          this.loadService();
        } else {
          this.$store.commit('title', 'New Service');
        }
      },
      async loadService() {
        this.service = await this.$store.dispatch('services/get', this.id);
        this.$store.commit('title', `'${this.service.name}'`);
      },
      async save() {
        this.$events.emit(EventTypes.VALIDATE);
        if (!this.errors.any()) {
          await this.$store.dispatch('services/save', this.service);
          this.navigateToServiceList();
        }
      },
      navigateToServiceList() {
        this.$router.push({name: 'service-list'});
      },
      refreshErrors(errors) {
        this.errors.clear();
        errors.forEach(({field, msg, rule, scope}) => {
          this.errors.add(field, msg, rule, scope);
        });
      }
    }
  };
</script>
