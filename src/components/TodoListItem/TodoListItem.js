import React from 'react';

import './TodoListItem.css';

const TodoListItem = ({ 
    id, 
    className, 
    label, 
    onToggleImportant, 
    onToggleDone, 
    onDelete, 
    onEditItemLabel 
    }) => {

    return (
        <div className = "todo-list-item" >
            <button 
                type = "button"
                className = "button-important"
                onClick = { onToggleImportant }>
            </button>
            <div 
                className = { className }
                onClick = { onToggleDone }
                id = { id }>
                
                { label }
                
            </div>
            <button 
                type = "button"
                onClick = { onEditItemLabel }>
                edit
            </button>
            <button 
                type = "button"
                onClick = { onDelete }>
                delete
            </button>  
        </div>
    );
};

export default TodoListItem;
