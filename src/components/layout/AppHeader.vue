<template>
  <v-toolbar
    dark
    app
    :extended="$vuetify.breakpoint.smAndUp"
    color="primary">
    <v-toolbar-side-icon
      v-if="!$store.state.showBack"
      @click.stop="toggleSidebar">
    </v-toolbar-side-icon>
    <v-btn
      icon
      v-if="isMobile && $store.state.showBack"
      @click.stop="onGoBack">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title v-if="isMobile">{{$store.state.title}}</v-toolbar-title>

    <v-spacer></v-spacer>

    <service-list-actions key="one" v-if="isMobile && isCurrentRoute('service-list')"></service-list-actions>
    <service-item-actions key="two" v-else-if="isMobile && isCurrentRoute('service-item')"></service-item-actions>
  </v-toolbar>
</template>

<script>
  import * as EventTypes from '@/event-types';
  import ServiceListActions from '@/components/admin/service-list/ServiceListActions';
  import ServiceItemActions from '@/components/admin/service-item/ServiceItemActions';

  export default {
    name: 'app-header',

    components: {
      ServiceListActions,
      ServiceItemActions
    },

    methods: {
      toggleSidebar () {
        this.$store.commit('sidebar', !this.$store.state.sidebar);
      },
      onGoBack () {
        this.$events.emit(EventTypes.GO_BACK);
      },
      isCurrentRoute (routeName) {
        return this.$route.name === routeName;
      }
    }
  };
</script>
