import Vue from 'vue'
import App from './App.vue'
import store from './store';
import router from './router'
import firebase from 'firebase'
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDvWWlW9r-I5tMB2qOZyIIwGUefCheWDV0",
    authDomain: "srweb-c8c18.firebaseapp.com",
    databaseURL: "https://srweb-c8c18.firebaseio.com",
    projectId: "srweb-c8c18",
    storageBucket: "srweb-c8c18.appspot.com",
    messagingSenderId: "369558281487",
    appId: "1:369558281487:web:0c2f6f67d0bfd3efc4727a"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
