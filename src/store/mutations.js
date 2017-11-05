export default {
  sidebar(state, payload) {
    state.sidebar = payload;
  },
  title(state, payload) {
    state.title = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
  setNotification(state, payload) {
    state.notification = payload;
  },
  clearNotification(state) {
    state.notification = null;
  }
};
