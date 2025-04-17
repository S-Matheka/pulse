import { CallTranscriptLine } from './CallDetailsModal';

export const sarahKTranscript: CallTranscriptLine[] = [
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

export const mikeRTranscript: CallTranscriptLine[] = [
  {
    timestamp: '0:00',
    speaker: 'Agent',
    text: 'Thank you for calling Midtown Medical Center, this is Mike speaking. How may I assist you today?'
  },
  {
    timestamp: '0:20',
    speaker: 'Patient',
    text: "Yes, I received a message about scheduling a follow-up appointment, but I've been having trouble getting through."
  },
  {
    timestamp: '0:35',
    speaker: 'Agent',
    text: "I apologize for the difficulty reaching us. I can help you schedule that follow-up right now. May I have your patient ID?"
  },
  {
    timestamp: '0:50',
    speaker: 'Patient',
    text: "It's P-5678."
  },
  {
    timestamp: '1:05',
    speaker: 'Agent',
    text: "Thank you. I see here that Dr. Johnson requested a follow-up in two weeks. We have several available slots. Would you prefer morning or afternoon?"
  },
  {
    timestamp: '1:25',
    speaker: 'Patient',
    text: "Morning would be better. I usually start work at 1 PM."
  },
  {
    timestamp: '1:40',
    speaker: 'Agent',
    text: "Perfect. I have an opening next Tuesday at 9:30 AM or Wednesday at 10:15 AM. Which would work better for you?"
  },
  {
    timestamp: '2:00',
    speaker: 'Patient',
    text: "Tuesday at 9:30 would be great."
  },
  {
    timestamp: '2:15',
    speaker: 'Agent',
    text: "Excellent. I'll schedule you for Tuesday at 9:30 AM with Dr. Johnson. Would you like me to send you a confirmation email or text message?"
  },
  {
    timestamp: '2:30',
    speaker: 'Patient',
    text: "Text message would be perfect."
  },
  {
    timestamp: '2:45',
    speaker: 'Agent',
    text: "I've sent the confirmation text. You'll also receive a reminder 24 hours before your appointment. Is there anything else I can help you with today?"
  }
];

export const lisaMTranscript: CallTranscriptLine[] = [
  {
    timestamp: '0:00',
    speaker: 'Agent',
    text: 'Thank you for calling Midtown Medical Center, this is Lisa speaking. How may I assist you today?'
  },
  {
    timestamp: '0:15',
    speaker: 'Patient',
    text: "Hi, I missed a call from the clinic earlier about my test results?"
  },
  {
    timestamp: '0:30',
    speaker: 'Agent',
    text: "I'd be happy to help. Could you please verify your patient ID for me?"
  },
  {
    timestamp: '0:45',
    speaker: 'Patient',
    text: "It's P-9012."
  },
  {
    timestamp: '1:00',
    speaker: 'Agent',
    text: "Thank you. I see that Dr. Martinez tried to reach you regarding your recent blood work. Unfortunately, she's with patients right now. Would you like me to have her call you back?"
  },
  {
    timestamp: '1:20',
    speaker: 'Patient',
    text: "Yes, please. When would that be?"
  },
  {
    timestamp: '1:35',
    speaker: 'Agent',
    text: "Dr. Martinez will be available after 4 PM today. I can make sure you're on her callback list. Is the number ending in 5432 still the best way to reach you?"
  },
  {
    timestamp: '1:55',
    speaker: 'Patient',
    text: "Actually, I have a new number. It's..."
  },
  {
    timestamp: '2:10',
    speaker: 'Agent',
    text: "I apologize, but I'm not able to hear you clearly. Could you repeat the number?"
  },
  {
    timestamp: '2:25',
    speaker: 'Patient',
    text: "[Call disconnected]"
  },
  {
    timestamp: '2:40',
    speaker: 'Agent',
    text: "Hello? I apologize but it seems we've lost connection. I'll leave a voicemail at the number we have on file."
  }
];

export const getTranscriptByAgent = (agent: string): CallTranscriptLine[] => {
  switch (agent) {
    case 'Mike R.':
      return mikeRTranscript;
    case 'Lisa M.':
      return lisaMTranscript;
    case 'Sarah K.':
    default:
      return sarahKTranscript;
  }
}; 