import React from "react";

import "./search-panel.css"

const SearchPanel = (props) => {
    const {onSearchChange} = props;

    return <input
        onChange={(evt) => onSearchChange(evt.target.value)}
        className="todo-app__search-input form-control mr-2"
        type="text"
        placeholder="search phrase"
    />
};

export default SearchPanel;
