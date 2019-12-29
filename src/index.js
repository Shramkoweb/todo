import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';


import TodoList from "./components/todo-list/todo-list";
import SearchPanel from "./components/search-panel/search-panel";
import AppHeader from "./components/app-header/app-header";

const App = () => {
    const todoData = [
        {label: "Learn React", important: true, id: 1},
        {label: "Read a book", important: false, id: 2},
        {label: "Drink a coffee", important: false, id: 3},
    ];

    return (
        <>
            <AppHeader/>
            <SearchPanel/>
            <TodoList todos={todoData}/>
            <Button>asdasdasd</Button>
        </>
    );
};

ReactDOM.render(<App/>, document.querySelector('#root'));
