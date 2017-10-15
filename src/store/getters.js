export default {
  primaryColor: (state) => {
    return state.module === 'admin' ? 'amber darken-2' : 'primary';
  },
  accentColor: (state) => {
    return state.module === 'admin' ? 'amber accent-2' : 'accent';
  }
};
