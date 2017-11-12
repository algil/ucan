export default {
  headers: [
    {text: 'Nombre', value: 'name', align: 'left', width: '60%'},
    {text: 'Precio', value: 'cost', align: 'center', width: '20%'},
    {text: 'Activo', value: 'active', align: 'center', width: '20%'}
  ],
  pagination: {
    sortBy: 'cost',
    descending: false,
    rowsPerPage: 1000000
  }
};
