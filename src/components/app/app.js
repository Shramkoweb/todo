import React, { useState } from 'react';

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

const App = () => {
    const createTodoItem = (label, isImportant = false) => {
        return {
            done: false,
            id: globalID++,
            important: isImportant,
            label,
        };
    };

    let globalID = 0;

    const mockTodos = mockTodoLabels.map((item, index) => createTodoItem(item, index % 2));
    const [todoData, setTodoData] = useState(mockTodos);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [filter, setFilter] = useState('all');


    const deleteTodoHandler = (id) => {
        setTodoData(todoData.filter((item) => item.id !== id))
    };

    const togglePropertyIn = (array, id, propertyName) => {
        const todoIndex = array.findIndex((item) => item.id === id);
        const oldItem = array[todoIndex];
        const newItem = {...oldItem, [propertyName]: !oldItem[propertyName]};
        return [
            ...array.slice(0, todoIndex),
            newItem,
            ...array.slice(todoIndex + 1)
        ];
    };

    const toggleDoneState = (id) => {
        setTodoData(togglePropertyIn(todoData, id, 'done'));
    };

    const toggleImportantState = (id) => {
        setTodoData(togglePropertyIn(todoData, id, 'important'));
    };

    const addTodo = (text) => {
        const todoTemplate = createTodoItem(text, false);

        setTodoData([...todoData, todoTemplate]);
    };

    const onSearchChange = (searchPhrase) => {
        setSearchPhrase(searchPhrase);
    };

    const onFilterChange = (filter) => {
        setFilter(filter);
    };

    const searchTodoByTerm = (initialState, searchPhrase) => {
        if (searchPhrase === "") {
            return initialState;
        }

        return initialState.filter((item) => item.label.toLowerCase().indexOf(searchPhrase.toLowerCase()) > -1);
    };


    const filterTodos = (items, filter) => {
        if (filter === 'all') {
            return items;
        } else if (filter === 'active') {
            return items.filter((item) => (!item.done));
        } else if (filter === 'done') {
            return items.filter((item) => item.done);
        }
    };

    const visibleItems = searchTodoByTerm(filterTodos(todoData, filter), searchPhrase);
    const doneTodosAmount = todoData.filter((item) => item.done).length;
    const todosAmount = todoData.length - doneTodosAmount;

    return (
        <div className="todo-app mx-auto mt-4">
            <AppHeader toDo={todosAmount} done={doneTodosAmount}/>
            <div className="d-flex mt-2 mb-2">
                <SearchPanel
                    onSearchChange={onSearchChange}
                />
                <ItemStatusFilter
                    filter={filter}
                    onFilterChange={onFilterChange}
                />
            </div>

            <TodoList
                todos={visibleItems}
                onDeleteButtonClick={deleteTodoHandler}
                onToggleDone={toggleDoneState}
                onToggleImportant={toggleImportantState}
            />
            <ItemAddForm
                onAddButtonClick={addTodo}
            />
        </div>
    );
};

export default App;
