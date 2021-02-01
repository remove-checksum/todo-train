import Vue from 'vue';
import App from './App.vue';

window.eventBus = new Vue(); // Event bus on window, so you dont have to import it into every component that uses it

Vue.config.productionTip = false;

Vue.directive('focus', {
  inserted: function (el) {
    el.focus();
  }
});

new Vue({
  render: h => h(App)
}).$mount('#app');
