import React, { useState, useRef, useEffect } from 'react';
import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface PulseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'pulse';
  content: string;
  timestamp: string;
}

// Static Header Avatar Component
const HeaderAvatar = () => (
  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
    <span className="text-lg text-primary-600 dark:text-primary-300">✨</span>
  </div>
);

// Animated Message Avatar Component
const MessageAvatar = () => (
  <div className="flex items-center justify-center w-8 h-8">
    <div className="relative flex items-center justify-center">
      <span className="absolute text-lg text-primary-600/50 dark:text-primary-300/50 animate-ping">✨</span>
      <span className="relative text-lg text-primary-600 dark:text-primary-300">✨</span>
    </div>
  </div>
);

const mockPulseResponse = (query: string): string => {
  if (query.toLowerCase().includes('wait time')) {
    return 'Based on current data, the average wait time is 18 minutes. This is 12% higher than last week. The longest waits are typically during Monday mornings and Wednesday afternoons.';
  } else if (query.toLowerCase().includes('patient satisfaction')) {
    return 'Patient satisfaction scores are currently at 4.2/5, with recent improvements in appointment scheduling satisfaction. However, we\'ve noticed a slight decline in satisfaction with wait times.';
  } else if (query.toLowerCase().includes('staffing')) {
    return 'Current staffing levels are at 92% of optimal capacity. We have 3 open positions in nursing and 2 in front desk support. Peak hour coverage has improved by 15% since last month.';
  } else if (query.toLowerCase().includes('compare performance')) {
    return 'I can help you compare clinic performance. Would you like to compare specific metrics like patient satisfaction, wait times, or staff utilization between clinics?';
  } else if (query.toLowerCase().includes('complaining')) {
    return 'Based on recent feedback, the top patient complaints are:\n1. Long wait times (35%)\n2. Parking availability (25%)\n3. Front desk communication (20%)\n4. Appointment scheduling (15%)\n5. Other (5%)';
  } else if (query.toLowerCase().includes('understaffing')) {
    return 'I\'ve analyzed staffing patterns and found potential understaffing issues in:\n1. Midtown Clinic - Peak hours (2-4 PM)\n2. Downtown Clinic - Monday mornings\n3. Buckhead Clinic - Wednesday afternoons\n\nWould you like detailed staffing recommendations?';
  } else if (query.toLowerCase().includes('getting worse')) {
    return 'Based on the past month\'s data, here are the top areas showing negative trends:\n\n' +
           '1. Pharmacy Issues:\n' +
           '   • Prescription delays (+20% increase)\n' +
           '   • Medication errors (+5% increase)\n\n' +
           '2. Patient Experience:\n' +
           '   • Long hold times (+15% increase)\n' +
           '   • Front desk service quality (+8% increase)\n\n' +
           '3. Communication:\n' +
           '   • Appointment delays (+12% increase)\n' +
           '   • Follow-up communication (+10% increase)\n\n' +
           'Would you like me to provide more detailed analysis of any of these areas?';
  } else {
    return 'I\'d be happy to help you analyze that. Could you provide more specific details about what you\'d like to know?';
  }
};

const PulseDrawer: React.FC<PulseDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const query = inputValue.trim();
    setInputValue('');

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString()
    };

    // Generate Pulse response
    const pulseResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'pulse',
      content: mockPulseResponse(query),
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage, pulseResponse]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: suggestion,
      timestamp: new Date().toLocaleTimeString()
    };

    const pulseResponse: Message = {
      id: (Date.now() + 1).toString(),
      type: 'pulse',
      content: mockPulseResponse(suggestion),
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage, pulseResponse]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-16 right-0 bottom-0 w-96 bg-white dark:bg-gray-800 shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out z-50">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <HeaderAvatar />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pulse</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-start space-x-3 animate-fade-in">
          <MessageAvatar />
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 max-w-[80%]">
            <p className="text-gray-900 dark:text-white">
              Hi! I'm Pulse, your communications insights assistant. How can I help you today?
            </p>
            <div className="mt-4 space-y-2">
              <button
                onClick={() => handleSuggestionClick("What's the current average wait time?")}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
              >
                What's the current average wait time?
              </button>
              <button
                onClick={() => handleSuggestionClick("How's our patient satisfaction trending?")}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
              >
                How's our patient satisfaction trending?
              </button>
              <button
                onClick={() => handleSuggestionClick("What are the top things that are getting worse over the past month?")}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
              >
                What are the top things that are getting worse over the past month?
              </button>
              <button
                onClick={() => handleSuggestionClick("Compare performance between two clinics")}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
              >
                Compare performance between two clinics
              </button>
              <button
                onClick={() => handleSuggestionClick("What are patients complaining about this week?")}
                className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
              >
                What are patients complaining about this week?
              </button>
            </div>
          </div>
        </div>

        {messages.map(message => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            } animate-fade-in`}
          >
            {message.type === 'pulse' && <MessageAvatar />}
            <div
              className={`rounded-lg p-4 max-w-[80%] ${
                message.type === 'user'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <p
                className={`mt-1 text-xs ${
                  message.type === 'user'
                    ? 'text-primary-100'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PulseDrawer; 