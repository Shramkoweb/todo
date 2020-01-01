import React, {PureComponent} from "react";
import {Button} from "react-bootstrap";

class ItemAddForm extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            todoLabel: ''
        };

        this._submitFormHandler = this._submitFormHandler.bind(this);
    }

    _inputChangeHandler(todoLabel) {
        this.setState((state) => {
            return {
                todoLabel: todoLabel
            };
        });
    }

    _submitFormHandler(evt) {
        evt.preventDefault();

        const {onAddButtonClick} = this.props;
        const {todoLabel} = this.state;

        onAddButtonClick(todoLabel);
        this.setState({
            todoLabel: ''
        })
    }

    render() {
        const {todoLabel} = this.state;

        return (
            <form
                onSubmit={this._submitFormHandler}
                className="d-flex mt-2">
                <input
                    value={todoLabel}
                    onChange={({target: {value}}) => this._inputChangeHandler(value)}
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
    }
};

export default ItemAddForm;
