<template>
  <div class="ui secondary pointing menu">
    <div>
      <a class="active item">SR</a>
    </div>
    <div class="right menu">
      <router-link to="/" class="ui item">Card List</router-link>
      <router-link to="/session" class="ui item">Start Session</router-link>
      <router-link to="/login" class="ui item">{{this.user}}</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: "Menu",
  props:{
  
  user: String
  }
};
</script>

<style scoped>
</style>