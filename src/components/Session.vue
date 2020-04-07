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
    </div>
        <button
      class="ui primary button"
      v-else
      @click="startSession"
    >Start today session</button>
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
import { mapGetters } from "vuex";
import PointsBar from "./PointsBar";
import CardSession from "./CardSession";

export default {
  name: "Session",
  data() {
    return { clickedToStart: false, };
  },
  components: {
    CardSession,
    PointsBar
  },
  computed: {
    ...mapGetters(["getCardsForToday"])
  },
  methods: {
    startSession(){
      this.clickedToStart = true;
    },
  }
};
</script>