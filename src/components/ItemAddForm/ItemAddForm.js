import React, { useState } from 'react';

import './ItemAddForm.css';

const ItemAddForm = ({ onItemAdded }) => {

    const initialState = { label: '' };
    const [state, setState] = useState(initialState)
    
    const onLabelChange = (evt) => {
        setState({
            label: evt.target.value
        })
    };

    const onSubmit = (evt) => {
        evt.preventDefault();
        const { label } = state;
        setState({ label: '' });
        const cb = onItemAdded || (() => {});
        if(label.length > 0) {
            cb(label);
        };
    };

    return (
        <form
            className = "bottom-panel d-flex"
            onSubmit = { onSubmit }>

            <input 
                type = "text"
                className = "form-control new-todo-label"
                value = { state.label }
                onChange = { onLabelChange }
                placeholder = "What needs to be done?" />

            <button 
                type = "submit"
                className = "btn btn-outline-secondary"> Add </button>
        </form>
    );
}


export default ItemAddForm
