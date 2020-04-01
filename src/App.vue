<template>
  <div id="app">
    <Menu></Menu>
    <div class="ui two stackable grid">
      <div class="twelve wide column">
    <CardList/>
      </div>
      <div class="four wide column">
    <CardView />
      </div>
    </div>
  </div>
</template>

<script>
import CardView from './components/CardView';
import Menu from './components/Menu';
import CardList from './components/CardList';

export default {
  name: 'App',
  components: {
    CardView,
    Menu,
    CardList
  }
}
</script>

<style>

</style>
