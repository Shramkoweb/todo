import React from 'react';

import TodoItem from '../todo-item';
import './todo-list.css';

const TodoList = ({todos, onDeleteButtonClick, onToggleDone, onToggleImportant}) => {

    const elements = todos.map((item) => {
        const {id, ...itemProps} = item;

        return (
            <li key={id} className="list-group-item list-group-item-action">
                <TodoItem
                    {...itemProps}
                    onDeleteButtonClick={() => onDeleteButtonClick(id)}
                    onToggleDone={() => onToggleDone(id)}
                    onToggleImportant={() => onToggleImportant(id)}
                />
            </li>
        );
    });

    return (
        <ul className="list-group">
            {elements}
        </ul>
    );
};

export default TodoList;
