<template>
  <div id="app">
    <Menu :user="username"></Menu>
    <div class="ui container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Menu from './components/Menu';
  import firebase from 'firebase';

export default {
  name: 'App',
  components: {
    Menu
  },
  data(){
    return{
    user : ""
    }
  },
  mounted(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user.email
          localStorage.setItem('app.SignIn', '1')
        }
        else{
          localStorage.setItem('app.SignIn', '0')
        }
        //this.loading = false
      });
  },
  computed:{
   username: function ()
    { return (this.user? this.user: "Login");}
  }
}
</script>

<style>

</style>