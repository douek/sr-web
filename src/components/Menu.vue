<template>
  <div class="ui secondary pointing menu">
    <div>
      <a class="active item">SR</a>
    </div>
    <div class="right menu">
      <router-link to="/" class="ui item">Card List</router-link>
      <router-link to="/session" class="ui item">Start Session</router-link>
      <a class="ui item">Login</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu"
};
</script>

<style scoped>
</style>