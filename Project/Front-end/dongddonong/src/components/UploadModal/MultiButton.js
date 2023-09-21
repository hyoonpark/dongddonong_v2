// MultiButton.js

import React from "react";
// import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function MultiButton({ options, selected, onChange }) {
    return (
        <ButtonGroup aria-label="Basic example">
            {options.map((option, index) => (
                <button
                    key={index}
                    className={selected === option ? 'bg-orange ml-2 w-12 drop-shadow-xl text-white rounded-md' : 'ml-2 w-12 drop-shadow-xl text-orange rounded-md'}
                    onClick={() => onChange(option)}
                >
                    {option}
                </button>
            ))}
        </ButtonGroup>
    );
}

export default MultiButton;
