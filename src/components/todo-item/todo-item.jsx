import React from "react";

import './todo-item.css';

const TodoItem = ({label, important = false}) => {
    const importantClasses = 'font-weight-bold text-info';

    return (
        <div className="d-flex align-items-center">
          <span className={important && importantClasses}>
              {label}
          </span>

            <button type="button"
                    className="ml-auto flex-shrink-0 mr-2 todo-app__item-button btn btn-outline-success btn-sm">
                <i className="fa fa-exclamation"/>
            </button>

            <button type="button" className="flex-shrink-0 todo-app__item-button btn btn-outline-danger btn-sm">
                <i className="fa fa-trash-o"/>
            </button>
        </div>
    );
};

export default TodoItem;
