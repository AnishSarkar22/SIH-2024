import React from 'react';

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  );
}

export function DialogContent({ children }) {
  return <div className="p-4">{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="border-b p-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}

export function DialogDescription({ children }) {
  return <p className="text-sm text-gray-500">{children}</p>;
}

export function DialogFooter({ children }) {
  return <div className="border-t p-4">{children}</div>;
}