import React, { useState } from 'react';

import './ItemAddForm.css';


const ItemAddForm = ({ stateForm, onItemAdded, onSaveItemLabel, onDelete }) => {

    const [stateValue, setStateValue] = useState({ label: '', edit: true });

    if(!stateForm.flag && (stateValue.edit)){ setStateValue({ ...stateForm, edit: false })};

    const onLabelChange = (evt) => {
        setStateValue({
            ...stateValue, label: evt.target.value 
        });
    };
    
    const onSubmit = (evt) => {
        evt.preventDefault();
        const { label } = stateValue;
        
        if(stateForm.flag) {
            if(label.length > 0) {
                onItemAdded(label);
            }
        } else {
            label.length > 0 ?
                onSaveItemLabel({ label, id: stateForm.id }):
                onDelete(stateForm.id);
        }
        setStateValue({ label: '', edit: true });
    };

    

    return (
        <form
            className = "bottom-panel d-flex"
            onSubmit = { onSubmit }>

            <input 
                type = "text"
                className = "form-control new-todo-label"
                value = { stateValue.label }
                onChange = { onLabelChange }
                
                placeholder = "What needs to be done?" />

            <button 
                type = "submit"
                className = "btn btn-outline-secondary"> { stateForm.flag ? 'Add' : 'Save' } </button>
        </form>
    );
}


export default ItemAddForm
