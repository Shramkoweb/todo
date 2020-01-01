import React, {PureComponent} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css';
import ItemAddForm from "../item-add-form";

class App extends PureComponent {
    constructor(props) {
        super(props);

        this.globaldId = 100;
        this.state = {
            todoData: [
                {label: 'Drink Coffee', important: false, id: 1},
                {label: 'Make Awesome App', important: true, id: 2},
                {label: 'Have a lunch', important: false, id: 3},
                {label: 'Buy a bread', important: true, id: 4}
            ]
        };

        this._deleteTodoHandler = this._deleteTodoHandler.bind(this);
        this._addTodoHandler = this._addTodoHandler.bind(this);
    }

    _deleteTodoHandler(id) {
        this.setState(({todoData}) => {
            return {
                todoData: todoData.filter((item) => item.id !== id)
            }
        });
    }

    _addTodoHandler(text) {
        this.setState(({todoData}) => {
            const todoTemplate = {
                label: text,
                id: this.globaldId++,
                important: false
            };

            return {
                todoData: [
                    ...todoData,
                    todoTemplate
                ]
            };
        });
    }

    render() {
        const {todoData} = this.state;

        return (
            <div className="todo-app mx-auto mt-4">
                <AppHeader toDo={todoData.length} done={0}/>
                <div className="d-flex mt-2 mb-2">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>

                <TodoList
                    todos={todoData}
                    onDeleteButtonClick={this._deleteTodoHandler}
                />
                <ItemAddForm
                    onAddButtonClick={this._addTodoHandler}
                />
            </div>
        );
    }
};

export default App;
