<template>
  <v-list-tile avatar>
    <v-list-tile-action>
      <v-checkbox
        v-model="center.selected"
        @change="onSelect">
      </v-checkbox>
    </v-list-tile-action>

    <v-list-tile-content @click="edit">
      <v-list-tile-title>{{center.name}}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  name: 'center-list-mobile-item',

  props: {
    center: {
      required: true,
      type: Object
    }
  },

  methods: {
    onSelect () {
      this.$emit('onSelect', this.center)
    },

    edit () {
      this.$router.push({name: 'CenterItem', params: {id: this.center.id}})
    }
  }
}
</script>
