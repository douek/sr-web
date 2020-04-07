//import supermemo2 from 'supermemo2'


const state ={
    cardList: [],
    nextId : 100
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
    setList: (state, list) =>{
        state.cardList = list;
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
    },
    deleteFromList: (state, card_id) =>{
        let card_index = state.cardList.findIndex( c => Number(c.id) == Number(card_id));
        state.cardList.splice(card_index, 1);
    },
    setNextID: (state, next_id) => {
        state.nextId = next_id;
    },
    updateNextID: (state) => {
        let next = Number(state.nextId) + 1;
        state.nextId = next;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
}