import React from 'react';

// ResizableWrapper component to handle dynamic sizing for charts and tables
export const ResizableWrapper = ({ children, width = 600, height = 300, className = "" }) => {
  return (
    <div 
      className={`w-full h-full ${className}`}
      style={{ minWidth: '300px', minHeight: '200px' }}
    >
      {React.cloneElement(children, {
        width: Math.max(width - 32, 300), // Account for padding, minimum width
        height: Math.max(height - 80, 200), // Account for title and padding, minimum height
      })}
    </div>
  );
};

// Drag handle component for better UX
export const DragHandle = ({ title, onReset }) => {
  return (
    <div className="drag-handle flex justify-between items-center p-2 bg-gray-50 border-b cursor-move hover:bg-gray-100 transition-colors">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      {onReset && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onReset();
          }}
          className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded transition-colors"
          title="Reset position and size"
        >
          Reset
        </button>
      )}
    </div>
  );
};
