import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VCurrencyField from 'v-currency-field'
import { VTextField } from 'vuetify/lib'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2);
Vue.component('v-text-field', VTextField)
Vue.use(VCurrencyField, { 
	locale: 'pt-BR',
	decimalLength: 2,
	autoDecimalMode: true,
	min: null,
	max: null,
	defaultValue: 0,
    valueAsInteger: false,
    allowNegative: true
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
