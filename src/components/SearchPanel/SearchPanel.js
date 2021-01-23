import React, { useState } from 'react';

import './SearchPanel.css';

const SearchPanel = ({ onSearchChange = () => {} }) => {

    const initialState = { term: '' };
    const [state, setState] = useState(initialState)

    const onTermChange = (e) => {
        setState({
            term: e.target.value
        });

        onSearchChange(e.target.value);
    };

    return (
        <input 
            type = "text"
            className = "form-control search-input"
            placeholder = "Search"
            value = { state.term }
            onChange = { onTermChange } />
    );
}

export default SearchPanel