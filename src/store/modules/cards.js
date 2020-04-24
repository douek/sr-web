import supermemo2 from 'supermemo2';
import moment from 'moment';
import firebase from 'firebase'

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
    },
    getSubmittedCards: state => {
        let today = new moment();
        return Object.values(state.cards).filter(card => {
            return today.isSame(card.currSession, 'day');
        })
    },
};

const actions = {
    createOrUpdateCard: ({commit}, card) =>{
        // add supermemo fields
        card.factor = 2.5;
        card.schedule = 1;
        card.appearsOn = new moment();
        card.lastSession = null;
        card.currSession = null;
        card.repeated = 0;
        card.date = new moment();
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
        c.repeated += 1;
        c.lastQuality = input.quality;
        let appearsOnDate = new moment();
     
        if (!ret.isRepeatAgain) {
            appearsOnDate.add(ret.schedule, 'd');
        }
        c.currSession = new moment();
        c.appearsOn = appearsOnDate;
        commit('UPDATE_OR_CREATE_CARD',c);
    },
    resetCardSubmitted:({commit}, list) => {
        list.forEach((c) => {
            c.submitted = false;
            commit('UPDATE_OR_CREATE_CARD',c);
        })
    },
    startSession: ({commit}, list) => {
        list.forEach(c => {
            if (!c.currSession){
                c.lastSession = null;
            }
            else{
                c.lastSession = moment(c.currSession);
            }
            c.currSession = null;
            c.repeated = 0;
            commit('UPDATE_OR_CREATE_CARD',c);
        })
    },
    endSession: ({commit}, list) => {
        list.forEach(c =>{
            let appearsOnDate = new moment();
            appearsOnDate.add(c.schedule, 'd');
            c.appearsOn = appearsOnDate;
            commit('UPDATE_OR_CREATE_CARD',c);
        })
    },
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
        if(localStorage.getItem('app.SignIn')=='1')
        firebase.database().ref(firebase.auth().currentUser.uid+'/cards/'+card.id).set({
            url: card.url,
            front: card.front,
            back: card.back,
            hint: card.hint,
            factor :card.factor,
            schedule:card.schedule,
            appearsOn: card.appearsOn.toString(),
            lastSession: card.lastSession,
            currSession: card.currSession,
            repeated: card.repeated,
            date: card.date.toString()
          });
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