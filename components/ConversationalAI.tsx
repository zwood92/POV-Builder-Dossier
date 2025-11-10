import React, { useState } from 'react';

const ConversationalAI: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    // Add user message to chat
    setMessages([...messages, { text: inputValue, sender: 'user' }]);
    setInputValue('');

    // Simulate AI response (replace with actual AI logic)
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { text: 'This is a simulated AI response.', sender: 'ai' }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-between gap-3 mb-8">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-[#111418] text-4xl font-black leading-tight tracking-[-0.033em]">Conversational AI Assistant</p>
          <p className="text-[#617589] text-base font-normal leading-normal">Your personal sales assistant for on-the-go support.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-white border border-gray-200 text-[#111418] text-base font-bold leading-normal tracking-[0.015em] hover:bg-gray-100">
            <span className="truncate">New Chat</span>
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-end gap-6 overflow-y-auto pb-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`${message.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-slate-800'} p-4 rounded-xl max-w-2xl shadow-md`}>
              <p className="text-base font-normal">{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="flex-1 relative">
          <textarea
            className="w-full min-h-[60px] max-h-[120px] p-4 text-base rounded-xl border border-gray-300 bg-white text-[#111418] resize-y focus:ring-blue-600 focus:border-blue-600 pr-12"
            placeholder="Describe the customer's problem or need..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <button onClick={handleSendMessage} className="absolute right-4 bottom-4 text-blue-600">
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationalAI;
