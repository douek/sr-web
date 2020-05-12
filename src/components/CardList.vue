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
    <tr  v-for="c in allCards" :class="{ active : active_el == c.card.id }" :key="c.card.id" @click="onSelectedCard(c.card)">
      <td>{{c.card.id}}</td>
      <td>{{c.card.front}}</td>
      <td>{{c.card.url}}</td>
      <td>{{dateFormat(c.card.date)}}</td>
    </tr>
  </tbody>
</table>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
    name: "CardList",
    computed: {
        ...mapGetters(['allCards','getNewId']),
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
                id: this.getNewId,
                url: "",
                front: "",
                back: "",
                hint:"",
                submitted:false
            };
            this.active_el = card.id;
            this.$emit('cardSelection', card);
        },
        dateFormat(dateISO){
            return moment(dateISO).format('LLL');
        }
    },
    created(){
        this.onSelectedNewCard;
    }
}
</script>