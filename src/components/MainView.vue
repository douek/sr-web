<template>
      <div id="main">
        <div class="ui two stackable grid">
      <div class="twelve wide column">
    <CardList @cardSelection="onCardSelect"/>
      </div>
      <div class="four wide column">
    <CardView @delete="onCardDelete" :card="selectedCard" />
      </div>
    </div>
  </div>
</template>

<script>
import CardView from './CardView';
import CardList from './CardList';

export default {
     name: 'MainView',
  components: {
    CardView,
    CardList
  },
  data(){
    return { selectedCard: null };
  },
  methods:{
    onCardSelect(card){
      let viewCard = {...card};
      this.selectedCard = viewCard;
    },
        onCardDelete(){
      this.selectedCard = null;
      this.$forceUpdate();
    }
  } 
}
</script>