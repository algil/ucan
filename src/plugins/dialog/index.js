import DialogComponent from './Dialog.vue';

const DialogPlugin = {
  install (Vue, options) {
    if (this.installed) {
      return;
    }
    this.installed = true;
    this.instance = new Vue();

    Vue.prototype.$dialog = {
      show (params) {
        DialogPlugin.instance.$events.emit('show-dialog', params);
      },
      
      hide () {
        DialogPlugin.instance.$events.emit('hide-dialog');
      }
    };

    Vue.component('app-dialog', DialogComponent);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(DialogPlugin);
}

export default DialogPlugin;
