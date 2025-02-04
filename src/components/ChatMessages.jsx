import React from 'react';

export default function ChatMessages({ conversation }) {
  return (
    <div className="flex-1 overflow-y-auto p-2 border border-gray-300 rounded mb-4">
      {conversation.length === 0 ? (
        <p className="text-gray-500">No messages yet. Start the conversation!</p>
      ) : (
        conversation.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === 'User' ? 'text-right' : 'text-left'}`}>
            <span className="font-semibold">{msg.sender}:</span> {msg.text}
            {msg.downloadUrl && (
              <div className="mt-2">
                <a
                  href={msg.downloadUrl}
                  download="sample-app.zip"
                  className="cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded"
                >
                  Download App
                </a>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}