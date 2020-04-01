<template>
  <div class="ui form container">
      <div class="field">
    <label class="inMiddle">URL</label>
    <input type="text" placeholder="url">
  </div>
  <div class="field">
    <label class="inMiddle">Front Card</label>
    <textarea></textarea>
  </div>
    <div class="field">
    <label class="inMiddle">Back Card</label>
    <textarea></textarea>
  </div>
    <div class="field">
    <label class="inMiddle">Clue (optional)</label>
    <textarea rows="2"></textarea>
  </div>
  <div>
 <button class="ui primary button">
  Save
</button>
<button class="right floated ui red button">
  Delete
</button>
  </div>
  </div>
</template>

<script>
export default {
  name: "CardView"
};
</script>

<style scoped>
.inMiddle{
    text-align: center;
}
</style>