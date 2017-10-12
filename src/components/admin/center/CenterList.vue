<template>
  <div>
    <v-data-table
      :headers="gridConfig.headers"
      :items="services"
      :pagination.sync="pagination"
      hide-actions
      v-model="selected"
      class="elevation-0">
      <template slot="items" scope="props" >
        <tr :class="{isDisabled: !props.item.active}">
          <td class="hidden-sm-and-up">
            {{ props.item.name }}<br>
            {{ props.item.cost }}<br>
          </td>
          <td class="hidden-xs-only">{{ props.item.name }}</td>
          <td class="text-xs-center hidden-xs-only">{{ props.item.cost }}</td>
          <td class="text-xs-center" style="width: 250px">
            <v-btn flat icon @click="editService(props.item)">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn flat icon @click="deleteService(props.item.id)">
              <v-icon>delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>


<script>
  export default {
    name: 'center-list',
    data: function() {
      return {
        centers: [
          {id: 1, name: 'Torre Acosta', active: true},
          {id: 2, name: 'Los Corazones', active: true},
          {id: 3, name: 'Carranque', active: false}
        ]
      }
    }
  };
</script>
