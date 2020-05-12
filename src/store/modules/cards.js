import supermemo2 from 'supermemo2';
import moment from 'moment';
import firebase from 'firebase';
import router from '../../router';
import { v4 as uuidv4 } from 'uuid';


const state = {
    cards: {},
};

const getters = {
    allCards: state => state.cards,
    getNewId: () => uuidv4(),
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
    emptyStateOnLogout: ({ commit }) => {
        console.log('calling logout');
        commit('EMPTY_STATE');
        router.push('/login');
    },
    fetchCardsFromDB: ({ commit }) => {
        var currentUser = firebase.auth().currentUser;
        if (currentUser) {
            firebase.database().ref('users')
                .child(currentUser.uid)
                .child('cards')
                .once('value')
                .then(snapshot => {
                    console.log("snapshot: ", snapshot)
                    let data = snapshot.val();
                    console.log("val: ", data);
                    commit('SET_LIST', data);
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
        let cards = {...state.cards };
        let c = {};
        c["card"] = card;
        cards[card.id] = c;
        state.cards = cards;
        console.log(firebase.auth().currentUser.uid);
        firebase.database()
        .ref('users')
        .child(firebase.auth().currentUser.uid)
        .child('cards')
        .child(card.id)
        .set({ card });
    },

    DELETE_CARD(state, card_id) {
        let cards = { ...state.cards };
        delete cards[card_id];
        state.cards = cards;
        firebase.database().ref('users')
            .child(firebase.auth().currentUser.uid)
            .child('cards')
            .child(card_id)
            .remove();
    },
    
    SET_LIST(state, data){
        state.cards = data;
    },


    EMPTY_STATE(state) {
        state.cards = {};
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
}