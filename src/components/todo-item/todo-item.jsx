import React, {PureComponent} from "react";

import './todo-item.css';

class TodoItem extends PureComponent {
    constructor(props) {
        super(props);
        this._handleLabelClick = this._handleLabelClick.bind(this);
        this._handleDoneButtonClick = this._handleDoneButtonClick.bind(this);

        this.state = {
            complete: false,
            important: false
        };
    }

    _handleLabelClick() {
        this.setState(({complete}) => ({
            complete: !complete
        }))
    }

    _handleDoneButtonClick() {
        this.setState(({important}) => ({
            important: !important
        }))
    }

    render() {
        const importantClasses = 'font-weight-bold text-info';
        const {label = false} = this.props;
        const {important, complete} = this.state;

        return (
            <div className="d-flex align-items-center">
          <span
              onClick={this._handleLabelClick}
              className={important ? importantClasses : ""}>
              {
                  complete ?
                      <del>{label}</del>
                      :
                      label
              }
          </span>
                <button type="button"
                        onClick={this._handleDoneButtonClick}
                        className="ml-auto flex-shrink-0 mr-2 todo-app__item-button btn btn-outline-success btn-sm">
                    <i className="fa fa-exclamation"/>
                </button>

                <button type="button" className="flex-shrink-0 todo-app__item-button btn btn-outline-danger btn-sm">
                    <i className="fa fa-trash-o"/>
                </button>
            </div>
        );
    }
};

export default TodoItem;
