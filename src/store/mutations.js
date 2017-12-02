export default {
  dark (state, payload) {
    state.dark = payload;
  },
  showBack (state, payload) {
    state.showBack = payload;
  },
  sidebar (state, payload) {
    state.sidebar = payload;
  },
  title (state, payload) {
    state.title = payload;
  },
  setLoading (state, payload) {
    state.loading = payload;
  },
  setNotification (state, payload) {
    state.notification = payload;
  },
  clearNotification (state) {
    state.notification = null;
  }
};
