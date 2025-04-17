import React, { useState } from 'react';
import { ChartBarIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface ComparisonResult {
  overview: {
    title: string;
    details: string;
  };
  metrics: {
    title: string;
    details: string;
  };
  complaints: {
    title: string;
    details: string;
  };
  staffing: {
    title: string;
    details: string;
  };
}

const mockComparisonResults: ComparisonResult = {
  overview: {
    title: "Performance Overview",
    details: "Midtown Clinic shows 15% higher patient satisfaction but 20% longer wait times compared to Downtown Clinic."
  },
  metrics: {
    title: "Key Metrics",
    details: "Average wait time: Midtown (22min) vs Downtown (15min). Patient satisfaction: Midtown (4.5/5) vs Downtown (4.2/5)."
  },
  complaints: {
    title: "Complaint Analysis",
    details: "Top issues at Midtown: parking availability (40% of complaints). Downtown: wait times (35% of complaints)."
  },
  staffing: {
    title: "Staffing Status",
    details: "Midtown at 92% staffing capacity with 2 open positions. Downtown at 85% with 3 open positions."
  }
};

const PulseQueries: React.FC = () => {
  const [selectedClinicA, setSelectedClinicA] = useState('');
  const [selectedClinicB, setSelectedClinicB] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);

  const handleCompare = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setComparisonResult(mockComparisonResults);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Pulse Location Comparison
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Select Locations to Compare
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Clinic A
              </label>
              <select
                value={selectedClinicA}
                onChange={(e) => setSelectedClinicA(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a clinic</option>
                <option value="midtown">Midtown Clinic</option>
                <option value="downtown">Downtown Clinic</option>
                <option value="buckhead">Buckhead Clinic</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Clinic B
              </label>
              <select
                value={selectedClinicB}
                onChange={(e) => setSelectedClinicB(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a clinic</option>
                <option value="midtown">Midtown Clinic</option>
                <option value="downtown">Downtown Clinic</option>
                <option value="buckhead">Buckhead Clinic</option>
              </select>
            </div>

            <button
              onClick={handleCompare}
              disabled={!selectedClinicA || !selectedClinicB || isLoading}
              className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <ChartBarIcon className="h-5 w-5 mr-2" />
                  Run Pulse Comparison
                </>
              )}
            </button>
          </div>
        </div>

        {comparisonResult && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Comparison Results
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-300">1</span>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {comparisonResult.overview.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {comparisonResult.overview.details}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-300">2</span>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {comparisonResult.metrics.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {comparisonResult.metrics.details}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-300">3</span>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {comparisonResult.complaints.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {comparisonResult.complaints.details}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-300">4</span>
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {comparisonResult.staffing.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {comparisonResult.staffing.details}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PulseQueries; 