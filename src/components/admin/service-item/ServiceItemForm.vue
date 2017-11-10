<template>
  <v-form>
    <v-container>
      <v-layout column>
        <v-flex xs12 md8 offset-md2>
          <v-text-field
            label="Nombre"
            v-model="service.name"
            required>
          </v-text-field>
          <v-text-field
            label="Precio"
            type="number"
            v-model="service.cost"
            suffix="€"
            required>
          </v-text-field>
          <v-checkbox
            label="Activo"
            v-model="service.active">
          </v-checkbox>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    name: 'service-item-form',
    props: ['service']
  }
</script>
