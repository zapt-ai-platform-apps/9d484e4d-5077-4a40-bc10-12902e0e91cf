import React, { useState } from 'react';
import * as Sentry from '@sentry/browser';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

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
      let assistantReply = { sender: 'Jarvis', text: 'How can I assist you further?' };
      if (userInput.toLowerCase().includes('app') || userInput.toLowerCase().includes('application')) {
        assistantReply = {
          sender: 'Jarvis',
          text: 'I have generated a sample application for you. You can download it below.',
          downloadUrl: 'https://example.com/sample-app.zip'
        };
      }
      setConversation(prev => [...prev, assistantReply]);
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
      <ChatMessages conversation={conversation} />
      <ChatInput
        userInput={userInput}
        onInputChange={(e) => setUserInput(e.target.value)}
        onInputKeyPress={(e) => {
          if (e.key === 'Enter') handleSend();
        }}
        onSend={handleSend}
        isLoading={isLoading}
      />
    </div>
  );
}