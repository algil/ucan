<template>
  <form>
    <v-container>
      <v-layout column>
        <v-flex xs12 md8 offset-md2>
          <v-text-field
            label="Nombre"
            v-model="service.name"
            data-vv-name="name"
            :error-messages="errors.collect('name')"
            v-validate="'required'"
            required>
          </v-text-field>
          <v-text-field
            label="Precio"
            type="number"
            v-model="service.cost"
            suffix="€"
            data-vv-name="cost"
            :error-messages="errors.collect('cost')"
            v-validate="'required|min_value:0'"
            required>
          </v-text-field>
          <v-checkbox
            label="Activo"
            v-model="service.active">
          </v-checkbox>
        </v-flex>
      </v-layout>
    </v-container>
  </form>
</template>

<script>
  import * as EventTypes from '../../../event-types';

  export default {
    name: 'service-item-form',
    props: ['service'],
    mounted() {
      this.$events.on(EventTypes.VALIDATE, this.onValidate);
    },
    beforeDestroy() {
      this.$events.off(EventTypes.VALIDATE, this.onValidate);
    },
    methods: {
      onValidate() {
        this.$validator.validateAll();
        this.$events.emit(EventTypes.ERROR_CHANGES, this.errors.items);
      }
    }
  }
</script>
