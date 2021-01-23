const initialState = {
    items : [],
    filter : 'all',
    search : '',
    loading : false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_TODO":
            return { ...state, loading : true };
        case "PUT_TODO":
            return state;
        case "TODO_RECEIVED":
            return { ...state, ...action.data, loading : false, server: true };
        case "SET_ITEM":
            return { ...state, items : action.items };
        case "RECEIV_FILTER":
            return { ...state, filter : action.filter };
        case "RECEIV_SEARCH":
            return { ...state, search : action.search };
        default:
            return state;
    }
};
   
export default reducer;
   


