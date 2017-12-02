<template>
  <v-list-tile avatar>
    <v-list-tile-action>
      <v-checkbox
        v-model="service.selected"
        @change="onSelect(service)">
      </v-checkbox>
    </v-list-tile-action>

    <v-list-tile-content>
      <v-list-tile-title>{{service.name}}</v-list-tile-title>
      <v-list-tile-sub-title>{{service.cost}} €</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
  export default {
    name: 'service-list-mobile-item',

    props: {
      service: {
        required: true,
        type: Object
      }
    },

    methods: {
      onSelect (service) {
        this.$emit('onSelect', this.service);
      }
    }
  }
</script>
