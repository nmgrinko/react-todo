import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import AppHeader from '../AppHeader';
import TodoList from '../TodoList';
import SearchPanel from '../SearchPanel';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';
import Loading from '../Loading';

import API from '../../utils/API';
import {  
    GET_TODO,        
    SET_ITEM,  
    RECEIV_FILTER,    
    RECEIV_SEARCH 
} from '../../store/actions' 


import './App.css';


const App = (props) => {
    const { 
        GET_TODO, 
        SET_ITEM, 
        RECEIV_FILTER, 
        RECEIV_SEARCH,
    } = props;

    const state = props.state;
    const { items, filter, search } =  props.state;

    const [get, setGet] = useState(true)

    const onItemAdded = (label) => {
        const result = (state) => {
            const item = createItem(label);
            return [...state.items, item];
        };
        SET_ITEM(result(state));
    };

    const toggleProperty = (arr, id, propName) => {
        const idx = arr.findIndex((item) => item.id === id);
        const oldItem = arr[idx];
        const value = !oldItem[propName];

        const item = { ...arr[idx], [propName]: value } ;
        return [
            ...arr.slice(0, idx),
            item,
            ...arr.slice(idx + 1)
        ];
    };

    const onToggleDone = (id) => {
        const result = (state) => {
            const items = toggleProperty(state.items, id, 'done');
            return items
        }
        SET_ITEM(result(state));
    };

    const onToggleImportant = (id) => {
        const result = (state) => {
            const items = toggleProperty(state.items, id, 'important');
            return items
        }
        SET_ITEM(result(state));
    };

    const onDelete = (id) => {
        const result = (state) => {
            const idx = state.items.findIndex((item) => item.id === id);
            const items = [
              ...state.items.slice(0, idx),
              ...state.items.slice(idx + 1)
            ];
            return items
        }
        SET_ITEM(result(state));
    };

    const onFilterChange = (filter) => {
        RECEIV_FILTER(filter);
    };

    const onSearchChange = (search) => {
        RECEIV_SEARCH(search);
    };

    const createItem = (label) => {
        return {
            id : Date.now(),
            label,
            important : false,
            done : false
        };
    }

    const filterItems = (items, filter) => {
        if (filter === 'all') {
            return items;
        } else if (filter === 'active') {
            return items.filter((item) => (!item.done));
        } else if (filter === 'done') {
            return items.filter((item) => item.done);
        }
    };

    const searchItems = (items, search) => {
        if (search.length === 0) {
            return items;
        };

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
        });
    };

    const changeValueItem = (id) => {
        const input = document.querySelector('.new-todo-label');
        const value = items.find((item) => item.id === id ).label;
        input.value = value;
    }

    const doneCount = items.filter((item) => item.done).length;
    const toDoCount = items.length - doneCount;
    const visibleItems = searchItems(filterItems(items, filter), search);

    useEffect(() => {
            try {
                API.put('/', {
                state: { ...state }
                })
            } catch (error) {
                console.log(error);
            }
        }
    ); 
 
    if(get) {
        GET_TODO();
        setGet(!get);
    };

    return (
        <div className = "todo-app">
            <AppHeader toDo = { toDoCount } done = { doneCount }/>

            <div className = "search-panel d-flex">
                <SearchPanel
                    onSearchChange = { onSearchChange }/>

                <ItemStatusFilter
                    filter = { filter }
                    onFilterChange = { onFilterChange } />
            </div>

            <TodoList
                items = { visibleItems }
                onToggleImportant = { onToggleImportant }
                onToggleDone = { onToggleDone }
                onDelete = { onDelete } 
                changeValueItem = { changeValueItem } />

            <ItemAddForm
                onItemAdded = { onItemAdded } />

            <Loading />
        </div>
    );
};


const mapStateToProps = (state) => {
    return { state }
};

const mapDispatchToProps = {
    GET_TODO,        
    SET_ITEM,  
    RECEIV_FILTER,    
    RECEIV_SEARCH,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
