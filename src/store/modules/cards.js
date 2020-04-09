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
        console.log(state.cardList.filter(card => card.appearsIn == 0).length);
        return (state.cardList.filter(card => card.appearsIn == 0).length);
    }
};

const actions = {
    createOrUpdateCard: ({commit}, card) =>{
        // add supermemo fields
        card.factor = 2.5;
        card.schedule = 1;
        card.appearsIn =0;
        commit('updateToList',card);
    },
    deleteCard: ({commit}, card) =>{
       commit('deleteFromList', card.date);
    },
    superMemoCardCalc: ({commit}, input) =>{
        // call super memo
        console.log(input.card);
        console.log(input.quality)
        let ret = supermemo2(input.quality, input.card.schedule, input.card.factor);
        console.log(ret);
        let c = {...input.card}
        c.schedule = ret.schedule;
        c.factor = ret.factor;
        if (ret.isRepeatAgain) {
            c.appearsIn = 0
        }
        else {
            c.appearsIn = ret.schedule;
        }
        commit('updateToList',c);
    }
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
            let next = Number(state.nextId) + 1;
            state.nextId = next;
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
};

export default {
    state,
    getters,
    actions,
    mutations,
}