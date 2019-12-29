import React from 'react';

import './item-status-filter.css';

const ItemStatusFilter = () => {
    return (
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
            <label className="btn btn-secondary active">
                <input type="radio" name="options" id="filter-all" defaultChecked/> All
            </label>
            <label className="btn btn-secondary">
                <input type="radio" name="options" id="filter-active"/> Active
            </label>
            <label className="btn btn-secondary">
                <input type="radio" name="options" id="filter-done"/> Done
            </label>
        </div>
    );
};

export default ItemStatusFilter;
