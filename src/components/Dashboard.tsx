import React from 'react';
import ConversationInsights from './ConversationInsights';
import ReputationOverview from './ReputationOverview';
import PulseComparison from './PulseComparison';
// ... other imports ...

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reputation Overview Section */}
        <ReputationOverview />

        {/* Conversation Insights Section */}
        <ConversationInsights />
      </div>

      {/* Pulse Comparison Section */}
      <div className="mt-6">
        <PulseComparison />
      </div>
    </div>
  );
};

export default Dashboard; 