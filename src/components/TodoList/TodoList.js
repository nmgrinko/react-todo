import React from 'react';

import DragAndDrop from '../DragAndDrop';
import '../DragAndDrop/DragAndDrop.css';

import TodoListItem from '../TodoListItem';
import './TodoList.css';

const TodoList = ({ 
    items, 
    onToggleImportant, 
    onToggleDone, 
    onDelete, 
    onEditItemLabel, 
    onDragAndDrop, 
    }) => {
        const idListGroup = 'idListGroup';

        const elements = items.map((item) => {
            const { id, important, done, ...itemProps } = item;

            let classNamelabel = 'todo-list-item-label';
            if (important) {
                classNamelabel += ' important';
            }
            if (done) {
                classNamelabel += ' done';
            }

            return (
                <DragAndDrop 
                    key = { id }
                    classNamelabel = { classNamelabel }
                    idListGroup = { idListGroup }
                    onDragAndDrop = { onDragAndDrop }>
                    <TodoListItem
                        {...itemProps}
                        id = { id }
                        className = { classNamelabel }
                        onToggleImportant = { () => onToggleImportant(id) }
                        onToggleDone = { () => onToggleDone(id) }
                        onDelete = { () => onDelete(id) }
                        onEditItemLabel = { () => onEditItemLabel(id) } />
                </DragAndDrop>
            );
        });

    return (<ul className = "todo-list list-group" id = { idListGroup }>{ elements }</ul>);
};

export default TodoList;
