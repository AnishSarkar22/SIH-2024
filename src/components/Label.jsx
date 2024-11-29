import React from 'react';

export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="text-gray-700 dark:text-gray-300">
      {children}
    </label>
  );
}