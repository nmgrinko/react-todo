import React from 'react';

import DragAndDrop from '../DragAndDrop';
import '../DragAndDrop/DragAndDrop.css';

import TodoListItem from '../TodoListItem';
import './TodoList.css';

const TodoList = ({ items, onToggleImportant, onToggleDone, onDelete, changeValueItem }) => {

    const idListGroup = 'idListGroup';

    const elements = items.map((item) => {
        const { id, important, done, ...itemProps } = item;

        let classNames = 'list-group-item';
        if (important) {
          classNames += ' important';
        }
      
        if (done) {
          classNames += ' done';
        }

        return (
            <DragAndDrop 
                key = { id } 
                classNames = { classNames } 
                idListGroup = { idListGroup }
                changeValueItem = { () => changeValueItem(id) }>
                <TodoListItem
                    { ...itemProps }
                    onToggleImportant = { () => onToggleImportant(id) }
                    onToggleDone = { () => onToggleDone(id) }
                    onDelete = { () => onDelete(id) } />
            </DragAndDrop>
        );
    });

    return (<ul className = "todo-list list-group" id = { idListGroup }>{ elements }</ul>);
};

export default TodoList;
