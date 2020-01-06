import React from "react";

import "./app-header.css"

const AppHeader = ({toDo, done}) => {
    return (
        <div className="todo-app__header d-flex">
            <h1 className="todo-app__title m-0">Todo List</h1>
            <p className="todo-app__amount m-0 ml-auto align-self-center">{toDo} more to do, {done} done</p>
        </div>
    );
};

export default AppHeader;
