<template>
  <div class="extra content">
    <div v-if="!card.submitted" class="ui form">
      <div class="inline fields">
        <label :for="getName">Select your points reuslt:</label>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" :name="getName" v-model="quality" :value="0" checked="checked" />
            <label>0</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" :name="getName" v-model="quality" :value="1" />
            <label>1</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" :name="getName" v-model="quality" :value="2" />
            <label>2</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" :name="getName" v-model="quality" :value="3" />
            <label>3</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" :name="getName" v-model="quality" :value="4" />
            <label>4</label>
          </div>
        </div>
        <div class="field">
          <div class="ui radio checkbox">
            <input type="radio" :name="getName" v-model="quality" :value="5" />
            <label>5</label>
          </div>
        </div>
      </div>
      <div>
        <div class="ui clearing divider"></div>
        <button @click="onSubmit" class="ui green button">submit</button>
      </div>
    </div>
    <div v-else class="ui success message">
      <div>Points Submitted</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "PointsBar",
  props: {
    card: Object,
  },
  data() {
    return {
      quality: "",
    };
  },
  computed: {
    getName() {
      return ("card" + this.card.id);
    }
  },
  methods: {
    ...mapActions(['superMemoCardCalc']),
    onSubmit(){
      let input = {
        card: this.card,
        quality: this.quality
      };

      this.superMemoCardCalc(input)
    }
  }
};
</script>