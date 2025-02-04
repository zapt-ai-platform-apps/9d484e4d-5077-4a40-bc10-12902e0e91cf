import React, { useState } from 'react';
import * as Sentry from '@sentry/browser';

export default function AIAssistant() {
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!userInput.trim()) {
      alert('Please enter a message.');
      return;
    }
    console.log('User message sent to AI Assistant:', userInput);
    const newMessage = { sender: 'User', text: userInput };
    setConversation([...conversation, newMessage]);
    setUserInput('');
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const assistantReply = { sender: 'Jarvis', text: 'How can I assist you further?' };
      setConversation((prev) => [...prev, assistantReply]);
      console.log('AI Assistant reply:', assistantReply.text);
    } catch (error) {
      console.error('Error in AI Assistant:', error);
      Sentry.captureException(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4">AI Assistant</h2>
      <div className="flex-1 overflow-y-auto p-2 border border-gray-300 rounded mb-4">
        {conversation.length === 0 && <p className="text-gray-500">No messages yet. Start the conversation!</p>}
        {conversation.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === 'User' ? 'text-right' : 'text-left'}`}>
            <span className="font-semibold">{msg.sender}:</span> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-grow p-2 border border-gray-300 box-border"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <button
          className="cursor-pointer bg-indigo-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={handleSend}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}