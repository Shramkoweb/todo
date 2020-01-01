import React, {PureComponent} from "react";
import {Button} from "react-bootstrap";

class ItemAddForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            todoLabel: ''
        };
    }

    _inputChangeHandler(todoLabel) {
        this.setState((state) => {
            return {
                todoLabel: todoLabel
            };
        });
    }

    render() {
        const {onAddButtonClick} = this.props;
        const {todoLabel} = this.state;

        return (
            <div className="d-flex mt-2">
                <input
                    value={todoLabel}
                    onChange={({target: {value}}) => this._inputChangeHandler(value)}
                    placeholder={"Add todo's text"}
                    className="form-control w-auto mr-2 flex-grow-1"
                    type="text"/>
                <Button
                    onClick={() => onAddButtonClick(todoLabel)}
                >
                    Add
                </Button>
            </div>
        );
    }
};

export default ItemAddForm;
