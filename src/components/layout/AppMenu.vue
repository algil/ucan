<template>
  <v-list dense>
    <template v-for="(item, index) in items">
      <v-list-group
        v-if="item.items"
        :group="item.group"
        :prepend-icon="item.icon"
        :key="index"
        no-action>
        <!-- Group header -->
        <v-list-tile slot="activator" ripple>
          <v-list-tile-content>
            <v-list-tile-title>{{ $t(item.title) }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <!-- Sub items -->
        <v-list-tile
          v-for="subItem in item.items"
          :key="subItem.title"
          :to="subItem.href"
          :disable="subItem.disable"
          ripple
          exact>
          <v-list-tile-content>
            <v-list-tile-title>
              <span>{{ $t(subItem.title) }}</span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>

      <v-subheader
        v-else-if="item.header"
        :key="index"
        class="mt-3 grey--text text--darken-1">
        <v-icon
          v-if="item.icon"
          color="grey darken-1"
          class="mr-2">
          {{item.icon}}
        </v-icon>
        <span>{{item.header}}</span>
      </v-subheader>

      <v-divider v-else-if="item.divider"  :key="index"></v-divider>

      <!-- Item without group -->
      <v-list-tile
        v-else
        :disabled="item.disabled"
        :to="item.href"
        :key="index"
        exact>
        <v-list-tile-action>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ $t(item.title) }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-menu',

  computed: {
    ...mapState({
      items: state => state.appMenuItems
    })
  }
}
</script>
