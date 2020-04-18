<template>
    <div>
        <table class="ui selectable celled table">
            <thead>
                <tr>
                    <th>Card ID</th>
                    <th>Card Front</th>
                    <th>Quality Points</th>
                    <th>Times Repeated</th>
                    <th>Last Review</th>
                    <th>Next Review</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="card in getSubmittedCards" :key="card.id">
                    <td>{{card.id}}</td>
                    <td>{{card.front}}</td>
                    <td>{{card.lastQuality}}</td>
                    <td>{{card.repeated}}</td>
                    <td>{{card.lastSession ? card.lastSession: "New Card!"}}</td>
                    <td>{{card.appearsOn}}</td>        
                </tr>
            </tbody>
        </table>
    </div>    
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'SessionReport',
    computed: {
        ...mapGetters(['getSubmittedCards']),
    },
}
</script>