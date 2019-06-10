import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
    created() {
      
      firebase.initializeApp({
        apiKey: 'API-KEY',
        authDomain: 'DOMAIN.firebaseapp.com',
        databaseURL: 'https://DB-URL.firebaseio.com',
        projectId: 'PROJECTID',
        storageBucket: '',
        messagingSenderId: 'MESSAGEID',
        appId: 'APPID'
      })
    }
}).$mount('#app')
