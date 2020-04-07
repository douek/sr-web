<template>
    <div class="ui text container">
        <p >{{card.front}}</p>
      </div>
</template>

<script>
export default {
    name:'CardSession',
    data:() => {
        return {
        showClue: false,
        showAnswer: false}
        },
    props:{
        card:Object
    },
    methods:{
        onShowClue(){
            this.showClue = true;
        },
        onShowAswer(){
            this.showAnswer = true
        }
    }
}
</script>