// degreebulls/src/redux/store.js
import { createStore } from 'redux';

// Initial state
const initialState = {
    actions: []
};

// Action types
const ADD_STRING = 'ADD_STRING';

// Action creators
export const addString = (string) => ({
    type: ADD_STRING,
    payload: string
});

// Reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_STRING:
            return {
                ...state,
                actions: [...state.actions, action.payload]
            };
        default:
            return state;
    }
};

// Create store
const store = createStore(reducer);

export default store;