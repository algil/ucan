<template>
  <v-list two-line>
    <template v-for="(service, index) in services">
      <service-list-mobile-item :service="service" @onSelect="onSelect" :key="index"></service-list-mobile-item>
      <v-divider v-show="index !== services.length - 1" :key="index"></v-divider>
    </template>
  </v-list>
</template>

<script>
import * as EventTypes from '@/event-types'
import ServiceListMobileItem from './ServiceListMobileItem'

export default {
  name: 'service-list-mobile',

  components: {
    ServiceListMobileItem
  },

  props: {
    services: {
      required: true,
      type: Array
    }
  },

  data () {
    return {
      selected: [],
      fabButton: null
    }
  },

  mounted () {
    this.fabButton = this.$refs.fab ? this.$refs.fab.$el : null
    this.$events.on(EventTypes.GO_BACK, this.clearSelection)
  },

  beforeDestroy () {
    this.$events.off(EventTypes.GO_BACK, this.clearSelection)
  },

  methods: {
    onSelect (service) {
      if (service.selected) {
        this.selected.push(service)
      } else {
        this.selected = this.selected.filter(s => s.id !== service.id)
      }
      this.$emit('onSelect', this.selected)
    },

    clearSelection () {
      this.selected = []
      this.services.map((service) => { service.selected = false })
      this.$emit('onSelect', this.selected)
    }
  }
}
</script>
