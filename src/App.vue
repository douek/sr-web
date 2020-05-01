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
    ...mapActions(['fetchUser'])
  },
  mounted(){
    this.$firebase.auth().onAuthStateChanged(user => {
      this.fetchUser(user);
    });

  }
}
</script>

<style>

</style>