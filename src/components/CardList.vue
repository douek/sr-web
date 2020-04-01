<template>
    <table class="ui celled table">
  <thead>
    <tr><th>Front Card</th>
    <th>URL</th>
    <th>Date of creation</th>
  </tr></thead>
  <tbody>
    <tr v-for="card in allCards.cardList" :key="card.date">
      <td>{{card.front}}</td>
      <td>{{card.url}}</td>
      <td>{{card.date}}</td>
    </tr>
  </tbody>
</table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "CardList",
    computed: {
        ...mapGetters(['allCards']),
    },
    methods :{
        ...mapActions(['fetchCardList']),
    },
    created(){
        this.fetchCardList();
    }
}
</script>