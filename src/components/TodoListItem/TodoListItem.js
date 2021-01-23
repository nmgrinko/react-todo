import React from 'react';

import './TodoListItem.css';

const TodoListItem = ({ label, onToggleImportant, onToggleDone, onDelete }) => {

    return (
        <span className = "todo-list-item" >
            <span
                className = "todo-list-item-label"
                onClick = { onToggleDone }>{ label }
            </span>

            <button 
                type = "button"
                className = "btn btn-outline-danger btn-sm float-right "
                onClick = { onDelete }>
                delete
            </button>

            <button 
                type = "button"
                className = "btn btn-outline-success btn-sm float-right"
                onClick = { onToggleImportant }>
                !
            </button>
        </span>
    );
};

export default TodoListItem;
