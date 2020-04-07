import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from "vuex-persistedstate";

import cards from './modules/cards';


Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        cards
    },
    plugins: [createPersistedState()]
})