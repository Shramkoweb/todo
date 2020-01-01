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
            }),
            searchPhrase: '',
            filter: 'all',
        };

        this._deleteTodoHandler = this._deleteTodoHandler.bind(this);
        this._addTodoHandler = this._addTodoHandler.bind(this);
        this._toggleTodoDoneStateHandler = this._toggleTodoDoneStateHandler.bind(this);
        this._toggleTodoImportantStateHandler = this._toggleTodoImportantStateHandler.bind(this);
        this._searchInputChange = this._searchInputChange.bind(this);
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

    _searchInputChange(searchPhrase) {
        this.setState({searchPhrase});
    }

    onFilterChange = (filter) => {
        this.setState({filter});
    };

    searchTodoByTerm(initialState, searchPhrase) {
        if (searchPhrase === "") {
            return initialState;
        }

        return initialState.filter((item) => item.label.toLowerCase().indexOf(searchPhrase.toLowerCase()) > -1);
    }


    filterItems(items, filter) {
        if (filter === 'all') {
            return items;
        } else if (filter === 'active') {
            return items.filter((item) => (!item.done));
        } else if (filter === 'done') {
            return items.filter((item) => item.done);
        }
    }

    render() {
        const {todoData, searchPhrase, filter} = this.state;
        const visibleItems = this.searchTodoByTerm(this.filterItems(todoData, filter), searchPhrase);
        const doneTodosAmount = todoData.filter((item) => item.done).length;
        const todosAmount = todoData.length - doneTodosAmount;

        return (
            <div className="todo-app mx-auto mt-4">
                <AppHeader toDo={todosAmount} done={doneTodosAmount}/>
                <div className="d-flex mt-2 mb-2">
                    <SearchPanel
                        onSearchChange={this._searchInputChange}
                    />
                    <ItemStatusFilter
                        filter={filter}
                        onFilterChange={this.onFilterChange}
                    />
                </div>

                <TodoList
                    todos={visibleItems}
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
