<template>
  <div>
    <!-- SAVE -->
    <v-tooltip bottom>
      <v-btn icon slot="activator" @click="onSave()">
        <v-icon>check</v-icon>
      </v-btn>
      <span>Save</span>
    </v-tooltip>
  </div>
</template>

<script>
  import * as EventTypes from '../../../event-types';

  export default {
    name: 'service-item-actions',
    methods: {
      onSave() {
        this.$events.emit(EventTypes.SERVICE_ON_SAVE);
      }
    }
  }
</script>
