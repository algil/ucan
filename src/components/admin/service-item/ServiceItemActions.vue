<template>
  <div>
    <!-- CANCEL -->
    <!--<v-tooltip bottom v-if="!isMobile">-->
      <!--<v-btn icon slot="activator" @click="onCancel()">-->
        <!--<v-icon>clear</v-icon>-->
      <!--</v-btn>-->
      <!--<span>Cancelar</span>-->
    <!--</v-tooltip>-->

    <!-- SAVE -->
    <v-tooltip bottom>
      <v-btn icon slot="activator" @click="onSave()">
        <v-icon>check</v-icon>
      </v-btn>
      <span>Guardar</span>
    </v-tooltip>

    <!--&lt;!&ndash; MOBILE TOOLS &ndash;&gt;-->
    <!--<v-menu bottom left v-if="isMobile">-->
      <!--<v-btn icon slot="activator" dark>-->
        <!--<v-icon>more_vert</v-icon>-->
      <!--</v-btn>-->
      <!--<v-list>-->
        <!--<v-list-tile @click="onCancel()">-->
          <!--<v-list-tile-title>Cancelar</v-list-tile-title>-->
        <!--</v-list-tile>-->
        <!--<v-list-tile @click="onSave()">-->
          <!--<v-list-tile-title>Guardar</v-list-tile-title>-->
        <!--</v-list-tile>-->
      <!--</v-list>-->
    <!--</v-menu>-->
  </div>
</template>

<script>
  import * as EventTypes from '../../../event-types';

  export default {
    name: 'service-item-actions',
    methods: {
      onCancel() {
        this.$events.emit(EventTypes.GO_BACK);
      },
      onSave() {
        this.$events.emit(EventTypes.SERVICE_ON_SAVE);
      }
    }
  }
</script>
