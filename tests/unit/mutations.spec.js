import { mutations } from "../../src/store/modules/cards"

describe("setList", () => {
    it("add a card to the list  ", () => {
        const state = {
            cardList: [],
        }
        
        const card = {
            id: 1,
            date: Date.now(),
            url: "http://google.com",
            front: "apple",
            back: "fruit",
            hint:"fr",
        }
        
        mutations.SET_LIST(state, [card])
        
        expect(state).toEqual({
            cardList: [card]
        })
    })
})

describe("UPDATE_OR_CREATE_CARD", () => {
    it("add a new card  ", () => {
        const state = {
            cardList: [],
            nextId: 1
        }
        
        const card = {
            id: 1,
            date: Date.now(),
            url: "http://google.com",
            front: "apple",
            back: "fruit",
            hint:"fr",
        }
        
        mutations.UPDATE_OR_CREATE_CARD(state, card)
        expect(state).toEqual({
            cardList: [card],
            nextId: 2
        })
        
    })
    
    it("update an existing card  ", () => {
        const existingCard = {
            id: 1,
            date: Date.now(),
            url: "http://google.com",
            front: "apple",
            back: "fruit",
            hint:"fr",
        }
        
        const state = {
            cardList: [existingCard],
            nextId: 1
        }
        
        const card = {
            id: 1,
            date: Date.now(),
            url: "http://bing.com",
            front: "tomato",
            back: "fruit",
            hint:"fr",
        }
        
        mutations.UPDATE_OR_CREATE_CARD(state, card)
        expect(state).toEqual({
            cardList: [card],
            nextId: 1
        })
        
    })
    
})
