import React from 'react';

export default function ChatInput({ userInput, onInputChange, onInputKeyPress, onSend, isLoading }) {
  return (
    <div className="flex space-x-2">
      <input
        type="text"
        className="flex-grow p-2 border border-gray-300 box-border"
        placeholder="Type your message..."
        value={userInput}
        onChange={onInputChange}
        onKeyPress={onInputKeyPress}
      />
      <button
        className="cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded disabled:opacity-50"
        onClick={onSend}
        disabled={isLoading}
      >
        {isLoading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}