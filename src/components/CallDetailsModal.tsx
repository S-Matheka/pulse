import React, { useState } from 'react';
import { 
  XMarkIcon, 
  SpeakerWaveIcon, 
  DocumentTextIcon,
  CheckCircleIcon,
  PhoneIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { getTranscriptByAgent } from './CallTranscripts';

export interface CallTranscriptLine {
  timestamp: string;
  speaker: 'Agent' | 'Patient';
  text: string;
}

interface CallDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  call: {
    customerId: string;
    customerName: string;
    phoneNumber: string;
    duration: string;
    summary: string;
    recordingUrl?: string;
    transcriptUrl?: string;
    shouldAnonymize?: boolean;
    isCrmVerified?: boolean;
    reasonForReview?: string;
    reasonSeverity?: 'negative' | 'warning' | 'positive';
    transcript?: CallTranscriptLine[];
    agent?: string;
  };
}

// Mock transcript data - in real app this would come from the call prop
const mockTranscript: CallTranscriptLine[] = [
  {
    timestamp: '0:00',
    speaker: 'Agent',
    text: 'Thank you for calling Midtown Medical Center, this is Sarah speaking. How may I assist you today?'
  },
  {
    timestamp: '0:20',
    speaker: 'Patient',
    text: "Hi, I've been waiting for a callback about my prescription refill request. I submitted it yesterday morning and haven't heard back."
  },
  {
    timestamp: '0:40',
    speaker: 'Agent',
    text: 'I apologize for the delay. Let me look up your prescription request right away.'
  },
  {
    timestamp: '1:00',
    speaker: 'Patient',
    text: "It's really frustrating because I'm almost out of my medication and I need it daily. I can't afford to wait much longer."
  },
  {
    timestamp: '1:25',
    speaker: 'Agent',
    text: "I understand your concern about the medication. I see your refill request here, but it's showing it needs provider approval. Let me escalate this to our nursing team right now."
  },
  {
    timestamp: '1:55',
    speaker: 'Patient',
    text: "Thank you, but this keeps happening. Every month I have to chase down my refills. There has to be a better way."
  },
  {
    timestamp: '2:15',
    speaker: 'Agent',
    text: "I hear your frustration with the refill process. I'm going to make a note in your chart about these recurring delays and recommend setting up automatic refills to prevent this in the future."
  },
  {
    timestamp: '2:35',
    speaker: 'Patient',
    text: "That would be helpful. How long until someone calls me back about today's refill?"
  },
  {
    timestamp: '2:50',
    speaker: 'Agent',
    text: "I'm marking this as urgent due to your supply situation. You should receive a call back within the next hour. Is there a specific phone number you prefer we use?"
  }
];

const CallDetailsModal: React.FC<CallDetailsModalProps> = ({
  isOpen,
  onClose,
  call
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const [showTranscript, setShowTranscript] = useState(false);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const customerDisplay = call.shouldAnonymize 
    ? `Patient ID ${call.customerId}`
    : call.customerName;

  const getSeverityColor = (severity?: 'negative' | 'warning' | 'positive') => {
    switch (severity) {
      case 'negative':
        return 'text-red-500 dark:text-red-400';
      case 'warning':
        return 'text-yellow-500 dark:text-yellow-400';
      case 'positive':
        return 'text-green-500 dark:text-green-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };

  const handleViewTranscript = () => {
    setShowTranscript(!showTranscript);
  };

  const handleViewHistory = () => {
    // Implement conversation history view
    console.log('View conversation history clicked');
  };

  const transcript = call.transcript || (call.agent ? getTranscriptByAgent(call.agent) : []);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 dark:bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Call Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 space-y-6 overflow-y-auto">
          {/* Customer Info and Phone in Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Customer</h3>
              <div className="flex items-center space-x-2">
                <p className="text-lg font-medium text-gray-900 dark:text-white">{customerDisplay}</p>
                {call.isCrmVerified && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    CRM Verified
                  </span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone</h3>
              <div className="flex items-center space-x-2">
                <p className="text-lg font-medium text-gray-900 dark:text-white">{call.phoneNumber}</p>
                <button className="p-2 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  <PhoneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Reason for Review */}
          {call.reasonForReview && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Reason for Review</h3>
              <p className={`text-lg font-medium ${getSeverityColor(call.reasonSeverity)}`}>
                {call.reasonForReview}
              </p>
            </div>
          )}

          {/* Summary */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Summary</h3>
            <p className="text-gray-900 dark:text-white">{call.summary}</p>
          </div>

          {/* Call Recording */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Call Recording</h3>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-6">
                {/* Play Button */}
                <button 
                  className="w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 flex items-center justify-center transition-colors shadow-lg"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <div className="w-5 h-5 flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-sm" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                    </div>
                  )}
                </button>

                {/* Progress Bar Container */}
                <div className="flex-1 space-y-2">
                  {/* Progress Bar */}
                  <div className="relative w-full">
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-600 dark:bg-primary-500 rounded-full transition-all duration-300 ease-in-out"
                        style={{ width: `${(currentTime / 180) * 100}%` }}
                      />
                    </div>
                    {/* Hover effect dot */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2"
                      style={{ left: `${(currentTime / 180) * 100}%` }}
                    >
                      <div className="w-3 h-3 bg-primary-600 dark:bg-primary-500 rounded-full shadow-md -ml-1.5" />
                    </div>
                  </div>

                  {/* Timestamps */}
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{call.duration}</span>
                  </div>
                </div>

                {/* Volume Control */}
                <div className="flex items-center space-x-3 min-w-[120px]">
                  <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                    <SpeakerWaveIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </button>
                  <div className="relative flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer accent-primary-600 dark:accent-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button 
              onClick={handleViewTranscript}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900"
            >
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              {showTranscript ? 'Hide Transcript' : 'View Transcript'}
            </button>
            <button 
              onClick={handleViewHistory}
              className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-900"
            >
              <ClockIcon className="h-5 w-5 mr-2" />
              Customer Conversation History
            </button>
          </div>

          {/* Transcript Section */}
          {showTranscript && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Call Transcript</h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-60 overflow-y-auto">
                {transcript.map((line, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex items-center mb-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400 w-16">
                        {line.timestamp}
                      </span>
                      <span className={`text-sm font-medium ${
                        line.speaker === 'Agent' 
                          ? 'text-blue-500 dark:text-blue-400'
                          : 'text-yellow-600 dark:text-yellow-500'
                      }`}>
                        {line.speaker}:
                      </span>
                    </div>
                    <p className="text-gray-900 dark:text-white ml-16">
                      {line.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallDetailsModal; 