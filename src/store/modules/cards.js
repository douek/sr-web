import api from '../../api/localFile';

const state ={
    selectedCard: {},
    cardList: []
};

const getters = {
    getSelectedCard: state => state.selectedCard,
    allCards: state => state.cardList,
};

const actions = {
    fetchCardList: async ({commit}) => {
        const data = await api.fetchCardsFromLocalFile();
        commit('setList',data);
        window.localStorage.setItem('cards_list', data);
    },
    createCard: ({commit}, card) =>{
        commit('addToList',card);
        api.updateLocalStorage()
    },
    updateCard: ({commit}, card) =>{
        commit('updateCardInList', card);
    },
    deleteCard: ({commit}, card) =>{
       commit('deleteFromList', card.date);
    },
    selectCard: ({commit}, card) =>{
        commit('setSelected', card);
    },
};

const mutations = {
    setSelected: (state, card) => {
        state.selectCard = card;
    },
    setList: (state, list) =>{
        state.cardList = list;
    },
    addToList: (state, card) =>{
        state.cardList.push(card);
    },
    deleteFromList: (state, card_id) =>{
        var card_index = state.cardList.findIndex( c => c.date == card_id);
        state.cardList.splice(card_index, 1);
    },
    updateCardInList: (state, card) =>{
        var card_index = state.cardList.findIndex( c => c.date == card.card_id);
        state.cardList[card_index] = card;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}