<template>
  <div>
    <!-- CANCEL -->
    <v-tooltip bottom>
      <v-btn icon slot="activator" @click="cancel()">
        <v-icon>clear</v-icon>
      </v-btn>
      <span>Cancelar</span>
    </v-tooltip>

    <!-- SAVE -->
    <v-tooltip bottom>
      <v-btn icon slot="activator" @click="save()">
        <v-icon>check</v-icon>
      </v-btn>
      <span>Guardar</span>
    </v-tooltip>

    <!-- MOBILE TOOLS -->
    <v-menu bottom left v-if="isMobile">
      <v-btn icon slot="activator" dark>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile @click="cancel()">
          <v-list-tile-title>Cancelar</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="save()">
          <v-list-tile-title>Guardar</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
  import { SERVICE_SAVE_EVENT, SERVICE_CANCEL_EVENT } from '../../../events-types';

  export default {
    name: 'service-item-actions',
    methods: {
      cancel() {
        this.$events.emit(SERVICE_CANCEL_EVENT);
      },
      async save() {
        this.$events.emit(SERVICE_SAVE_EVENT);
      }
    }
  }
</script>
