import supermemo2 from 'supermemo2'

const state ={
    cardList: [],
    nextId : 100
};

const getters = {
    allCards: state => state.cardList,
    getNextId: state => state.nextId,
    getCardsForToday: state => {
      return (state.cardList.filter(card => card.appearsIn == 0));
    },
    getSessionCount: state => {
        return (state.cardList.filter(card => card.appearsIn == 0).length);
    }
};

const actions = {
    createOrUpdateCard: ({commit}, card) =>{
        // add supermemo fields
        card.factor = 2.5;
        card.schedule = 1;
        card.appearsIn =0;
        commit('UPDATE_OR_CREATE_CARD',card);
    },
    deleteCard: ({commit}, card) =>{
       commit('DELETE_CARD', card.date);
    },
    superMemoCardCalc: ({commit}, input) =>{
        // call super memo
        let ret = supermemo2(input.quality, input.card.schedule, input.card.factor);
        let c = {...input.card}
        c.schedule = ret.schedule;
        c.factor = ret.factor;
        c.submitted = true;
        if (ret.isRepeatAgain) {
            c.appearsIn = 0
        }
        else {
            c.appearsIn = ret.schedule;
        }
        commit('UPDATE_OR_CREATE_CARD',c);
    },
    resetCardSubmitted:({commit}, list) => {
        list.forEach((c) => {
            c.submitted = false;
            commit('UPDATE_OR_CREATE_CARD',c);
        })
    }
}

export const mutations = {
    SET_LIST (state, list) {
        state.cardList = list;
    },

    UPDATE_OR_CREATE_CARD (state, card) {
        let list = [...state.cardList];
        let card_index = list.findIndex( c => Number(c.id) === Number(card.id));
        if (card_index != -1){
            list[card_index] = card;
        } else{
            list.push(card);
            let next = Number(state.nextId) + 1;
            state.nextId = next;
        } 
        state.cardList = list;
    },

    DELETE_CARD (state, card_id) {
        let card_index = state.cardList.findIndex( c => Number(c.id) == Number(card_id));
        state.cardList.splice(card_index, 1);
    },

    SET_NEXT_ID (state, next_id) {
        state.nextId = next_id;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
}