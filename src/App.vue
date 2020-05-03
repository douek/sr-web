<template>
  <div id="app">
    <Menu></Menu>
    <div class="ui container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Menu from './components/Menu';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
    Menu
  },
  methods:{
    ...mapActions(['fetchUser', 'fetchCardsFromDB'])
  },
  mounted(){
    this.$firebase.auth().onAuthStateChanged(user => {
      this.fetchUser(user);
      if (user) {
            this.fetchCardsFromDB();
      }
    });
  }
}
</script>

<style>

</style>