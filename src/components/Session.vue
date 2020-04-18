<template>
  <div class="ui continer">
    <div v-if="clickedToStart">
    <div
      class="ui raised very padded text container segment"
      v-for="c in getCardsForToday"
      :key="c.id"
    >
      <CardSession :card="c" />
      <div class="ui clearing divider"></div>
      <PointsBar :card="c"/>
    </div>
    <button
      class="ui primary button"
      v-if="getSessionCount > 0"
      @click="resetCardSubmitted(getCardsForToday)"
    >Repeat low points cards (below 4)</button>
        <div v-else class="ui blue message">
      <div>Yay! All cards reviewed! Click End session to finish and review result</div>
    </div>
    <router-link to = '/sessionReport'>
    <button
      class="ui positive button"
      @click="endSession(getCardsForToday)"
    >End session</button>
    </router-link>
    </div>
        <button
      class="ui primary button"
      v-else-if="getSessionCount > 0"
      @click="startSessionV"
    >Start today session</button>
    <div v-else class="ui blue message">
      <div>There are no card for today</div>
    </div>
    <div class="ui clearing divider"></div>

    <div>
      <p>
        5 - perfect response
        <br />4 - correct response after a hesitation
        <br />3 - correct response recalled with serious difficulty or with hint
        <br />2 - incorrect response; where the correct one seemed easy to recall
        <br />1 - incorrect response; the correct one remembered
        <br />0 - complete blackout.
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PointsBar from "./PointsBar";
import CardSession from "./CardSession";

export default {
  name: "Session",
  data() {
    return { 
      clickedToStart: false,
    };
  },
  components: {
    CardSession,
    PointsBar
  },
  computed: {
    ...mapGetters(['getCardsForToday','getSessionCount']),
  },
  methods: {
    ...mapActions(['resetCardSubmitted', 'startSession', 'endSession']),
    startSessionV(){
      this.clickedToStart = true;
      this.startSession(this.getCardsForToday);
          },
  }
};
</script>