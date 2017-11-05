<template>
  <div>
    <!-- EDIT -->
    <v-tooltip bottom v-show="selected.length === 1">
      <v-btn icon slot="activator" @click="onEdit()">
        <v-icon>mode_edit</v-icon>
      </v-btn>
      <span>Editar</span>
    </v-tooltip>

    <!-- REMOVE -->
    <v-tooltip bottom v-show="selected.length > 0">
      <v-btn icon slot="activator" @click="onRemove()">
        <v-icon>delete</v-icon>
      </v-btn>
      <span>Eliminar</span>
    </v-tooltip>
  </div>
</template>

<script>
  import * as EventTypes from '../../../event-types';

  export default {
    name: 'service-list-actions',
    data() {
      return {
        selected: []
      }
    },
    mounted() {
      this.$events.on(EventTypes.SERVICE_LIST_ON_SELECT, this.onSelectionChange);
    },
    beforeDestroy() {
      this.$events.off(EventTypes.SERVICE_LIST_ON_SELECT, this.onSelectionChange);
    },
    methods: {
      onEdit() {
        this.$events.emit(EventTypes.SERVICE_LIST_ON_EDIT);
      },
      onRemove() {
        this.$events.emit(EventTypes.SERVICE_LIST_DELETE);
      },
      onSelectionChange(selected) {
        this.selected = selected;
      }
    }
  }
</script>
