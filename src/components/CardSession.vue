<template>
  <div class="ui container">
    <div class="content">
      <p>{{card.front}}</p>
    </div>
  <div v-if="card.hint" class="ui segment">
    <a class="clickToShow" v-if="!showClue" @click="onShowClue">Click to show the hint</a>
    <div v-else class="content">
      <p>{{card.hint}}</p>
    </div>
  </div>
    <div class="ui segment">
    <a class="clickToShow" v-if="!showAnswer" @click="onShowAswer">Click to show the answer</a>
    <div v-else class="content">
      <p>{{card.back}}</p>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardSession",
  data: () => {
    return {
      showClue: false,
      showAnswer: false
    };
  },
  props: {
    card: Object
  },
  methods: {
    onShowClue() {
      this.showClue = true;
    },
    onShowAswer() {
      this.showAnswer = true;
    }
  }
};
</script>

<style scoped>
.clickToShow{
    cursor: pointer;
}
.clickToShow.hover{
    color: darkblue;
}
</style>