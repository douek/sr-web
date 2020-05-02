<template>
  <div class="ui secondary pointing menu">
    <div>
      <a class="active item">SR</a>
    </div>
    <div class="right menu">
      <router-link to="/" class="ui item">Card List</router-link>
      <router-link to="/session" class="ui item">Start Session</router-link>
      <a v-if="user.loggedIn" @click="signout" class="ui item">Logout</a>
      <router-link v-else to="/login" class="ui item">Login</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Menu",
  computed: {
    ...mapGetters(['user'])
  },
   methods: {
    signout() {
      this.$firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('/login');
        },(err) => {
              console.log(err.message)         
              });
    }
   }
};
</script>

<style scoped>
</style>