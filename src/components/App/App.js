import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './App.css';

import AppHeader from '../AppHeader';
import TodoList from '../TodoList';
import SearchPanel from '../SearchPanel';
import ItemStatusFilter from '../ItemStatusFilter';
import ItemAddForm from '../ItemAddForm';
import Loading from '../Loading';

import {  
    GET_TODO,
    PUT_TODO,        
    SET_ITEM,  
    RECEIV_FILTER,    
    RECEIV_SEARCH 
} from '../../store/actions'; 


let timeRender = 0

const App = (props) => {
    const { 
        GET_TODO,
        PUT_TODO, 
        SET_ITEM, 
        RECEIV_FILTER, 
        RECEIV_SEARCH,
    } = props;

    const state = props.state;
    const { items, filter, search } =  props.state;

    const [get, setGet] = useState(true);

    const initialAddToSave = {label: '', flag: true};
    const [stateForm, setStateForm] = useState(initialAddToSave);


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
            setStateForm(initialAddToSave);
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

    const onEditItemLabel = (id) => {
        const value = items.find((item) => item.id === id ).label;
        setStateForm({label: value, flag: false, id: id});
    }
    
    const onSaveItemLabel = ({label, id}) => {
        const newItems = items.slice();
        const index = newItems.findIndex((item) => item.id === id );
        newItems[index].label = label;
        setStateForm(initialAddToSave);
    };

    const doneCount = items.filter((item) => item.done).length;
    const toDoCount = items.length - doneCount;
    const visibleItems = searchItems(filterItems(items, filter), search);
    
    const onDragAndDrop = (idActiveItem, idNextItem) => {
        const newItems = items.slice();
        const indexActiveItem = items.findIndex(item => (item.id === +idActiveItem))
        const indexNextItem = items.findIndex(item => (item.id === +idNextItem))
        if ((indexActiveItem !== -1) && (indexNextItem !== -1)) {
        
        const ActiveItem = items[indexActiveItem];
        const NextItem = items[indexNextItem];
        
        newItems[indexActiveItem] = NextItem;
        newItems[indexNextItem] = ActiveItem;
        
        SET_ITEM(newItems);
    }};

    useEffect(() => {
        const time = Date.now() - timeRender;
        if(state.server) {
            if(time > 100) {
                PUT_TODO({items: state.items});
            } 
        } 
        timeRender = Date.now();
    }); 
 
    if(get) {
        GET_TODO();
        setGet(!get);
    };
    
    
    

    return (
        <div className = "todo-app">
            <AppHeader toDo = { toDoCount } done = { doneCount }/>

            <div className = "search-panel d-flex">
                <SearchPanel
                    onSearchChange = { onSearchChange } />

                <ItemStatusFilter
                    filter = { filter }
                    onFilterChange = { onFilterChange } />
            </div>

            <TodoList
                items = { visibleItems }
                onToggleImportant = { onToggleImportant }
                onToggleDone = { onToggleDone }
                onDelete = { onDelete } 
                onEditItemLabel = { onEditItemLabel }
                onDragAndDrop = { onDragAndDrop } />

            <ItemAddForm
                stateForm = { stateForm }
                onDelete = { onDelete }
                onSaveItemLabel = { onSaveItemLabel }
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
    PUT_TODO,        
    SET_ITEM,  
    RECEIV_FILTER,    
    RECEIV_SEARCH,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
