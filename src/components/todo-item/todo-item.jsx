import React from "react";

import './todo-item.css';

const TodoItem = (props) => {
    const {
        done,
        important,
        label,
        onDeleteButtonClick,
        onToggleDone,
        onToggleImportant,
    } = props;

    const importantClasses = 'font-weight-bold text-info';

    return (
        <div className="d-flex align-items-center">
          <span
              onClick={onToggleDone}
              className={important ? importantClasses : ""}>
              {
                  done ?
                      <del>{label}</del>
                      :
                      label
              }
          </span>
            <button
                onClick={onToggleImportant}
                type="button"
                className="ml-auto flex-shrink-0 mr-2 todo-app__item-button btn btn-outline-success btn-sm">

                <i className="fa fa-exclamation"/>
            </button>

            <button
                onClick={onDeleteButtonClick}
                type="button"
                className="flex-shrink-0 todo-app__item-button btn btn-outline-danger btn-sm">
                <i className="fa fa-trash-o"/>
            </button>
        </div>
    );
};

export default TodoItem;
