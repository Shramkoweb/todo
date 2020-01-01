import React, {PureComponent} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css';
import ItemAddForm from "../item-add-form";

const mockTodoLabels = [
    'Drink Coffee',
    'Make Awesome App',
    'Have a lunch',
    'Buy a bread',
];

class App extends PureComponent {
    constructor(props) {
        super(props);
        this.globaldId = 0;

        this.state = {
            todoData: mockTodoLabels.map((item, index) => {
                return this._createTodoItem(item, index % 2)
            })
        };

        this._deleteTodoHandler = this._deleteTodoHandler.bind(this);
        this._addTodoHandler = this._addTodoHandler.bind(this);
        this._toggleTodoDoneStateHandler = this._toggleTodoDoneStateHandler.bind(this);
        this._toggleTodoImportantStateHandler = this._toggleTodoImportantStateHandler.bind(this);
    }

    _createTodoItem(label, isImportant = false) {
        return {
            done: false,
            id: this.globaldId++,
            important: isImportant,
            label,
        };
    }


    _deleteTodoHandler(id) {
        this.setState(({todoData}) => {
            return {
                todoData: todoData.filter((item) => item.id !== id)
            }
        });
    }

    _togglePropertyIn(array, id, propertyName) {
        const todoIndex = array.findIndex((item) => item.id === id);
        const oldItem = array[todoIndex];
        const newItem = {...oldItem, [propertyName]: !oldItem[propertyName]};
        return [
            ...array.slice(0, todoIndex),
            newItem,
            ...array.slice(todoIndex + 1)
        ];
    }

    _toggleTodoDoneStateHandler(id) {
        this.setState(({todoData}) => {
            return {
                todoData: this._togglePropertyIn(todoData, id, 'done')
            };
        });
    }

    _toggleTodoImportantStateHandler(id) {
        this.setState(({todoData}) => {
            return {
                todoData: this._togglePropertyIn(todoData, id, 'important')
            };
        });
    }

    _addTodoHandler(text) {
        this.setState(({todoData}) => {
            const todoTemplate = this._createTodoItem(text, false);

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
        const doneTodosAmount = todoData.filter((item) => item.done).length;
        const todosAmount = todoData.length - doneTodosAmount;

        return (
            <div className="todo-app mx-auto mt-4">
                <AppHeader toDo={todosAmount} done={doneTodosAmount}/>
                <div className="d-flex mt-2 mb-2">
                    <SearchPanel/>
                    <ItemStatusFilter/>
                </div>

                <TodoList
                    todos={todoData}
                    onDeleteButtonClick={this._deleteTodoHandler}
                    onToggleDone={this._toggleTodoDoneStateHandler}
                    onToggleImportant={this._toggleTodoImportantStateHandler}
                />
                <ItemAddForm
                    onAddButtonClick={this._addTodoHandler}
                />
            </div>
        );
    }
};

export default App;
