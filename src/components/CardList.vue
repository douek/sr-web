<template>
<div class="ui container">
    <button class="floated ui green button" @click="onSelectedNewCard" >Add New</button>
    <table class="ui selectable celled table">
  <thead>
    <tr>
        <th>id</th>
        <th>Front Card</th>
    <th>URL</th>
    <th>Date of creation</th>
  </tr></thead>
  <tbody>
    <tr  v-for="card in allCards" :class="{ active : active_el == card.id }" :key="card.id" @click="onSelectedCard(card)">
      <td>{{card.id}}</td>
      <td>{{card.front}}</td>
      <td>{{card.url}}</td>
      <td>{{card.date}}</td>
    </tr>
  </tbody>
</table>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: "CardList",
    computed: {
        ...mapGetters(['allCards','getNextId']),
    },
    data:()=>{
       return{ active_el: 0 }
    },
    methods :{
        onSelectedCard(card) {
            this.active_el = card.id;
            this.$emit('cardSelection', card);
        },
        onSelectedNewCard() {
            let card = {
                id: this.getNextId,
                date: Date.now(),
                url: "",
                front: "",
                back: "",
                hint:"",
                submitted:false
            };
            this.active_el = card.id;
            this.$emit('cardSelection', card);
        },
    },
    created(){
        this.onSelectedNewCard;
    }
}
</script>