<template>
  <div v-if="card" class="ui form padded container">
      <div class="field">
    <label class="inMiddle">URL</label>
    <input v-model="card.url" type="text" placeholder="url">
  </div>
  <div class="field">
    <label class="inMiddle">Front Card</label>
    <textarea v-model="card.front"></textarea>
  </div>
    <div class="field">
    <label class="inMiddle">Back Card</label>
    <textarea v-model="card.back"></textarea>
  </div>
    <div class="field">
    <label class="inMiddle">hint (optional)</label>
    <textarea v-model="card.hint" rows="2"></textarea>
  </div>
  <div>
 <button class="ui primary button" @click="createOrUpdateCard({...card})">
  Save
</button>
<button @click="deleteCardCallback()" class="right floated ui red button">
  Delete
</button>
  </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: "CardView",
  props:{
      card: Object
  },
  methods:{
      ...mapActions(['createOrUpdateCard','deleteCard']),
      deleteCardCallback(){
                  let card = this.card;
                  this.$emit('delete');
                  this.deleteCard(card);
      }
  },
};
</script>

<style scoped>
.inMiddle{
    text-align: center;
}
</style>