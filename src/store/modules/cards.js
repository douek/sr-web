import supermemo2 from 'supermemo2';
import moment from 'moment';

const state ={
    cards: {},
    nextId : 100
};

const getters = {
    allCards: state => state.cards,
    getNextId: state => state.nextId,
    getCardsForToday: state => {
        let today = new moment();
        return Object.values(state.cards).filter(card => {
            return today.isSameOrAfter(card.appearsOn,'day')
        })
    },
    getSessionCount: state => {
        let today = new moment();
        return Object.values(state.cards).filter(card => {
            return today.isSameOrAfter(card.appearsOn,'day')
        }).length;
    }
};

const actions = {
    createOrUpdateCard: ({commit}, card) =>{
        // add supermemo fields
        card.factor = 2.5;
        card.schedule = 1;
        card.appearsOn = new moment();
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
        let appearsOnDate = new moment();
     
        if (!ret.isRepeatAgain) {
            appearsOnDate.add(ret.schedule, 'd');
        }
        
        c.appearsOn = appearsOnDate;
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
    UPDATE_OR_CREATE_CARD (state, card) {
        let cards = {...state.cards};
        if (!state.cards[card.id]) {
            let next = state.nextId + 1;
            state.nextId = next;
        }
        cards[card.id] = card;
        state.cards= cards;
    },

    DELETE_CARD (state, card_id) {
        let card_index = state.cards.findIndex( c => Number(c.id) == Number(card_id));
        state.cards.splice(card_index, 1);
    },

};

export default {
    state,
    getters,
    actions,
    mutations,
}