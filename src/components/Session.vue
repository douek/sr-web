<template>
    <div class="ui continer">
        <div class="ui raised very padded text container segment" v-for="c in allCards" :key="c.id">
        <CardSession :card="c"/>
        <div class="ui clearing divider"></div>
        <PointsBar/>
        </div>
        <div>
      <p>
        5 - perfect response
        <br />4 - correct response after a hesitation
        <br />3 - correct response recalled with serious difficulty
        <br />2 - incorrect response; where the correct one seemed easy to recall
        <br />1 - incorrect response; the correct one remembered
        <br />0 - complete blackout.
      </p>
    </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PointsBar from './PointsBar';
import CardSession from './CardSession';

export default {
    name: 'Session',
    components:{
        CardSession,
        PointsBar
    },
    computed:{
        ...mapGetters(['allCards']),
    }

}
</script>