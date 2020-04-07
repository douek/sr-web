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

export default {
  name: 'App',
  components: {
    Menu
  }
}
</script>

<style>

</style>