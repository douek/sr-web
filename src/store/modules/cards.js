import supermemo2 from 'supermemo2';
import moment from 'moment';
import firebase from 'firebase';
import router from '../../router';

const state = {
    cards: {},
    nextId: 100
};

const getters = {
    allCards: state => state.cards,
    getNextId: state => state.nextId,
    getCardsForToday: state => {
        let today = new moment();
        return Object.values(state.cards).filter(card => {
            return today.isSameOrAfter(card.appearsOn, 'day')
        })
    },
    getSessionCount: state => {
        let today = new moment();
        return Object.values(state.cards).filter(card => {
            return today.isSameOrAfter(card.appearsOn, 'day')
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
    emptyStateOnLogout: ({commit}) =>{
        console.log('calling logout');
        commit('EMPTY_STATE');
        router.push('/login');
    },
    fetchCardsFromDB: ({commit}) => {
        var currentUser = firebase.auth().currentUser;
        if (currentUser) {
            firebase.database().ref('/users/' + currentUser.uid + '/cards/')
                .once('value')
                .then(function (snapshot) {
                    let data = snapshot.val();
                    console.log(data);

                    let list = data ? Object.entries(data) : [];
                    console.log(list);
                    commit('SET_LIST', list);
                });
                firebase.database().ref('/users/' + currentUser.uid + '/nextId')
                .once('value')
                .then(function (snapshot) {
                    let next = snapshot.val();
                    console.log(next);
                });
        }
    },
    createOrUpdateCard: ({ commit }, card) => {
        // add supermemo fields
        card.factor = 2.5;
        card.schedule = 1;
        card.appearsOn = new moment().format();
        card.lastSession = null;
        card.currSession = null;
        card.repeated = 0;
        card.date = new moment().format();
        commit('UPDATE_OR_CREATE_CARD', card);
    },
    deleteCard: ({ commit }, card) => {
        commit('DELETE_CARD', card.id);
    },
    superMemoCardCalc: ({ commit }, input) => {
        // call super memo
        let ret = supermemo2(input.quality, input.card.schedule, input.card.factor);
        let c = { ...input.card }
        c.schedule = ret.schedule;
        c.factor = ret.factor;
        c.submitted = true;
        c.repeated += 1;
        c.lastQuality = input.quality;
        let appearsOnDate = new moment();

        if (!ret.isRepeatAgain) {
            appearsOnDate.add(ret.schedule, 'd');
        }
        c.currSession = new moment().format();
        c.appearsOn = appearsOnDate.format();
        commit('UPDATE_OR_CREATE_CARD', c);
    },
    resetCardSubmitted: ({ commit }, list) => {
        list.forEach((c) => {
            c.submitted = false;
            commit('UPDATE_OR_CREATE_CARD', c);
        })
    },
    startSession: ({ commit }, list) => {
        list.forEach(c => {
            if (!c.currSession) {
                c.lastSession = null;
            }
            else {
                c.lastSession = c.currSession;
            }
            c.currSession = null;
            c.repeated = 0;
            commit('UPDATE_OR_CREATE_CARD', c);
        })
    },
    endSession: ({ commit }, list) => {
        list.forEach(c => {
            let appearsOnDate = new moment();
            appearsOnDate.add(c.schedule, 'd');
            c.appearsOn = appearsOnDate.format();
            commit('UPDATE_OR_CREATE_CARD', c);
        })
    },
}

export const mutations = {
    UPDATE_OR_CREATE_CARD(state, card) {
        let cards = { ...state.cards };
        if (!state.cards[card.id]) {
            let next = state.nextId + 1;
            state.nextId = next;
            firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/nextId').set({ next });

        }
        cards[card.id] = card;
        state.cards = cards;
        console.log(firebase.auth().currentUser.uid);
        firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/cards/' + card.id).set({ card });
    },

    DELETE_CARD(state, card_id) {
        let cards = { ...state.cards };
        delete cards[card_id];
        state.cards = cards;
        firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/cards/' + card_id).remove();
    },
    
    SET_LIST(state, data){
        let list = {};
        console.log(data);
        Array.prototype.forEach.call(data,c => {
            list[c[0]] = c[1].card;
        });
        console.log(list);
        state.cards = list;
    },
    SET_NEXT_ID(state, next_id){
        state.nextId = next_id.next;
    },

    EMPTY_STATE(state){
        state.cards = {};
        state.nextId = 0;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
}