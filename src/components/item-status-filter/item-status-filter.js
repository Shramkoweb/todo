import React from 'react';

import './item-status-filter.css';

const filters = [
    {name: 'All'},
    {name: 'Active'},
    {name: 'Done'}
];

const ItemStatusFilter = (props) => {
    const {filter, onFilterChange} = props;

    const filterElements = filters.map((item, index) => {
        const isActive = item.name.toLowerCase() === filter;
        const classNames = `btn btn-secondary ${isActive ? 'active' : ''}`;

        return (
            <label key={`${index}-label`} className={classNames}>
                <input
                    onChange={(evt) => onFilterChange(evt.target.id)}
                    type="radio"
                    name="options"
                    id={item.name.toLowerCase()}
                    checked={isActive}
                />
                {item.name}
            </label>
        );
    });

    return (
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
            {filterElements}
        </div>
    );
};

export default ItemStatusFilter;
