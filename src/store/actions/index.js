const getTodo = () => ({
    type: 'GET_TODO'
});

const putTodo = (state) => ({
    type: 'PUT_TODO', state 
});

const onItemAdded = items => ({
    type: 'SET_ITEM', items
});

const onFilterChange = filter => ({
    type: 'RECEIV_FILTER', filter
});

const onSearchChange = search => ({
    type: 'RECEIV_SEARCH', search
});


export const GET_TODO = getTodo;
export const PUT_TODO = putTodo;
export const SET_ITEM = onItemAdded;
export const RECEIV_FILTER = onFilterChange;
export const RECEIV_SEARCH = onSearchChange;