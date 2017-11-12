export default {
  headers: [
    {text: 'Name', value: 'name', align: 'left', width: '60%'},
    {text: 'Cost', value: 'cost', align: 'center', width: '20%'},
    {text: 'Active', value: 'active', align: 'center', width: '20%'}
  ],
  pagination: {
    sortBy: 'cost',
    descending: false,
    rowsPerPage: 1000000
  }
};
