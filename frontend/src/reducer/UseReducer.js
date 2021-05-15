export const initialState = false;
export const searchInitial = null;

export const reducer = (state, action) => {
    if(action.type === 'USER'){
        return action.payload;
    }
    else if(action.type === 'Seach'){
        return action.payload;
    }
    return state;
}