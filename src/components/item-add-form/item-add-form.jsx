import React, { useState } from "react";
import { Button } from "react-bootstrap";

const ItemAddForm = ({onAddButtonClick}) => {
    const [todoLabel, setTodoLabel] = useState('');

    const inputChangeHandler = (todoLabel) => {
        setTodoLabel(todoLabel);
    };

    const submitFormHandler = (evt) => {
        evt.preventDefault();

        onAddButtonClick(todoLabel);
        setTodoLabel('');
    };

    return (
        <form
            onSubmit={submitFormHandler}
            className="d-flex mt-2">
            <input
                value={todoLabel}
                onChange={({target: {value}}) => inputChangeHandler(value)}
                placeholder={"Add todo's text"}
                className="form-control w-auto mr-2 flex-grow-1"
                type="text"/>
            <Button
                disabled={!todoLabel}
                type="submit"
            >
                Add
            </Button>
        </form>
    );
};

export default ItemAddForm;
