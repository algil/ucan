<template>
  <div>
    <service-list-desktop
      v-if="!isMobile"
      :services="services"
      @onSelect="onSelect">
    </service-list-desktop>

    <service-list-mobile
      v-if="isMobile"
      :services="services"
      @onSelect="onSelect">
    </service-list-mobile>

    <v-fab-transition>
      <v-btn
        color="accent"
        dark
        fab
        fixed
        bottom
        right
        ref="fab"
        @mouseenter="fabTooltip = true"
        @mouseleave="fabTooltip = false"
        @click="add()">
        <v-icon>add</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-tooltip
      top
      :activator="fabButton"
      v-model="fabTooltip">
      <span>{{ $t('label.new') }}</span>
    </v-tooltip>
  </div>
</template>

<script>
  import * as EventTypes from '@/event-types';
  import ServiceListDesktop from './ServiceListDesktop';
  import ServiceListMobile from './ServiceListMobile';

  export default {
    name: 'service-list',

    components: {
      ServiceListDesktop,
      ServiceListMobile
    },

    data () {
      return {
        services: [],
        selected: [],
        fabButton: null,
        fabTooltip: false
      };
    },

    mounted () {
      this.fabButton = this.$refs.fab ? this.$refs.fab.$el : null;
      this.$events.on(EventTypes.SERVICE_LIST_ON_EDIT, this.edit);
      this.$events.on(EventTypes.SERVICE_LIST_DELETE, this.remove);
      this.$store.commit('title', this.$t('service.titleList'));
      this.loadServices();
    },

    beforeDestroy () {
      this.$events.off(EventTypes.SERVICE_LIST_ON_EDIT, this.edit);
      this.$events.off(EventTypes.SERVICE_LIST_DELETE, this.remove);
    },

    methods: {
      async loadServices () {
        this.selected = [];
        this.services = await this.$store.dispatch('services/getAll');
      },

      add () {
        this.$router.push({name: 'ServiceItem', params: {id: 'new'}});
      },

      edit () {
        this.$router.push({name: 'ServiceItem', params: {id: this.selected[0].id}});
      },

      async remove () {
        await this.$store.dispatch('services/remove', this.selected);
        this.$snackBar.success(this.$tc('service.deleteSuccess', this.selected.length));
        this.loadServices();
      },

      onSelect (selected) {
        this.selected = selected;
        this.$events.emit(EventTypes.SERVICE_LIST_ON_SELECT, selected);
      }
    }
  };
</script>
