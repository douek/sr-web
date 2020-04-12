import { mutations } from "../../src/store/modules/cards"

describe("UPDATE_OR_CREATE_CARD", () => {
    it("add a new card  ", () => {
        const state = {
            cards: {},
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

        const expectedState = {
            cards: {
                1: card,
            },
            nextId: 2
        }

        mutations.UPDATE_OR_CREATE_CARD(state, card)

        expect(state).toEqual(expectedState)        
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
            cards: {1:existingCard},
            nextId: 2
        }
        const card = {
            id: 1,
            date: Date.now(),
            url: "http://bing.com",
            front: "tomato",
            back: "fruit",
            hint:"fr",
        }

        const expectedState = {
            cards: {1:card},
            nextId: 2
        }
        
        mutations.UPDATE_OR_CREATE_CARD(state, card)
        
        expect(state).toEqual(expectedState)
    })
    
})
