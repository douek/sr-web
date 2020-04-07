//import supermemo2 from 'supermemo2'
import api from '../../api/localFile';


const state ={
    cardList: window.localStorage.getItem('cards_list'),
    nextId : window.localStorage.getItem('next_id')
};

const getters = {
    allCards: state => state.cardList,
    getNextId: state => state.nextId,
    getCardsForToday: state=>{
        //filter on card list for what is appearsin 0
        console.log("TODO ", state)
    },
};

const actions = {
    fetchCardList: async ({commit}) => {
        const data = await api.fetchCardsFromLocalFile();
        commit('setList',data.cardList);
        commit('setNextID',data.nextId);
    },
    createOrUpdateCard: ({commit}, card) =>{
        commit('updateToList',card);
        commit('updateNextID');
        // introduce to supermemo
        // let sr = {factor: 2.5,
        //     schedule: 1,
        //    appearsIn: 1};
        
    },
    deleteCard: ({commit}, card) =>{
       commit('deleteFromList', card.date);
    },
    // superMemoCardCalc: ({commit}, card, quality) =>{
    //     // call super memo
    //     let ret = supermemo2(quality, card.schedule, card.factor);
    //     card.schedule = ret.schedule;
    //     card.factor = ret.factor;
    //     if (ret.isRepeatAgain) {
    //         card.appearsIn = 0
    //     }
    //     else {
    //         card.appearsIn = ret.schedule;
    //     }

    // }
}

const mutations = {
    initList: (state) =>{
        if(localStorage.getItem('cards_list')) {
            // Replace the state object with the stored item
            this.replaceState(
                Object.assign(state, JSON.parse(localStorage.getItem('store')))
            );
        }
    },
    setList: (state, list) =>{
        state.cardList = list;
        window.localStorage.setItem('cards_list', JSON.stringify(list));
    },
    updateToList: (state, card) =>{
        let list = [...state.cardList];
        let card_index = list.findIndex( c => Number(c.id) === Number(card.id));
        if (card_index != -1){
            list[card_index] = card;
        } else{
            list.push(card);
        } 
        state.cardList = list;
        window.localStorage.setItem('cards_list', JSON.stringify(list));
    },
    deleteFromList: (state, card_id) =>{
        let card_index = state.cardList.findIndex( c => Number(c.id) == Number(card_id));
        state.cardList.splice(card_index, 1);
    },
    setNextID: (state, next_id) => {
        state.nextId = next_id;
        window.localStorage.setItem('next_id',next_id);
    },
    updateNextID: (state) => {
        let next = Number(state.nextId) + 1;
        state.nextId = next;
        window.localStorage.setItem('next_id',next);
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}