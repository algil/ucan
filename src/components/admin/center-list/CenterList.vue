<template>
  <div>
    <center-list-desktop
      v-if="!isMobile"
      :centers="centers"
      @onSelect="onSelect">
    </center-list-desktop>

    <center-list-mobile
      v-if="isMobile"
      :centers="centers"
      @onSelect="onSelect">
    </center-list-mobile>

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
import * as EventTypes from '@/event-types'
import CenterListDesktop from './CenterListDesktop'
import CenterListMobile from './CenterListMobile'

export default {
  name: 'center-list',

  components: {
    CenterListDesktop,
    CenterListMobile
  },

  data () {
    return {
      centers: [],
      selected: [],
      fabButton: null,
      fabTooltip: false
    }
  },

  mounted () {
    this.fabButton = this.$refs.fab ? this.$refs.fab.$el : null
    this.$events.on(EventTypes.GO_BACK, this.clearSelection)
    this.$events.on(EventTypes.CENTER_LIST_ON_EDIT, this.edit)
    this.$events.on(EventTypes.CENTER_LIST_DELETE, this.remove)
    this.$store.commit('title', this.$t('center.titleList'))
    this.loadCenters()
  },

  beforeDestroy () {
    this.$events.off(EventTypes.GO_BACK, this.clearSelection)
    this.$events.off(EventTypes.CENTER_LIST_ON_EDIT, this.edit)
    this.$events.off(EventTypes.CENTER_LIST_DELETE, this.remove)
  },

  methods: {
    async loadCenters () {
      this.selected = []
      this.centers = await this.$store.dispatch('centers/getAll')
    },

    add () {
      this.$router.push({name: 'CenterItem', params: {id: 'new'}})
    },

    edit () {
      this.$router.push({name: 'CenterItem', params: {id: this.selected[0].id}})
    },

    async remove () {
      await this.$store.dispatch('centers/remove', this.selected)
      this.$snackBar.success(this.$tc('center.deleteSuccess', this.selected.length))
      this.loadCenters()
    },

    onSelect (selected) {
      this.changeSelection(selected)
    },

    clearSelection () {
      this.changeSelection([])
    },

    changeSelection (selected) {
      this.selected = selected
      this.$store.commit('showBack', this.selected.length > 0)
      this.$events.emit(EventTypes.CENTER_LIST_SELECTION_CHANGED, this.selected)
    }
  }
}
</script>
