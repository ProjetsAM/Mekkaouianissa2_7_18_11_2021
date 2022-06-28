import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import des fichiers CSS des frameworks [Bootstrap] et [BootstrapVue] 
import './plugins/bootstrap-vue'



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
