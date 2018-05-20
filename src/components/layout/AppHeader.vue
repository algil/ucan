<template>
  <v-toolbar
    app
    fixed
    clipped-left
    dark
    color="primary">
    <v-toolbar-side-icon
      v-if="!$store.state.showBack"
      @click.stop="toggleSidebar">
    </v-toolbar-side-icon>

    <v-btn
      icon
      v-if="$store.state.showBack"
      @click.stop="onGoBack">
      <v-icon>arrow_back</v-icon>
    </v-btn>

    <v-toolbar-title>{{$store.state.title}}</v-toolbar-title>

    <v-spacer></v-spacer>

    <app-header-toolbars></app-header-toolbars>
  </v-toolbar>
</template>

<script>
import * as EventTypes from '@/event-types'
import AppHeaderToolbars from './AppHeaderToolbars'

export default {
  name: 'app-header',

  components: {
    AppHeaderToolbars
  },

  methods: {
    toggleSidebar () {
      this.$store.commit('sidebar', !this.$store.state.sidebar)
    },

    onGoBack () {
      this.$events.emit(EventTypes.GO_BACK)
    }
  }
}
</script>
