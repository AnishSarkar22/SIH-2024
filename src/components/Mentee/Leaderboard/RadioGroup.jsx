import React from 'react';

export function RadioGroup({ value, onValueChange, children }) {
  return (
    <div onChange={(e) => onValueChange(e.target.value)}>
      {children}
    </div>
  );
}

export function RadioGroupItem({ value, id }) {
  return (
    <input
      type="radio"
      id={id}
      name="radio-group"
      value={value}
      className="mr-2"
    />
  );
}