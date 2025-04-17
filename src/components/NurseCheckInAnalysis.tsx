import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface NurseCheckInAnalysisProps {
  checkInData: Array<{ date: string; avgTime: number }>;
  shiftCoverage: Array<{ shift: string; current: number; recommended: number }>;
}

const NurseCheckInAnalysis: React.FC<NurseCheckInAnalysisProps> = ({
  checkInData,
  shiftCoverage
}) => {
  // Line chart data for check-in times
  const lineChartData = {
    labels: checkInData.map(d => d.date),
    datasets: [
      {
        label: 'Average Check-in Time (minutes)',
        data: checkInData.map(d => d.avgTime),
        borderColor: 'rgb(59, 130, 246)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  // Line chart options
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Minutes'
        }
      }
    }
  };

  // Bar chart data for shift coverage
  const barChartData = {
    labels: shiftCoverage.map(s => s.shift),
    datasets: [
      {
        label: 'Current Nurses',
        data: shiftCoverage.map(s => s.current),
        backgroundColor: 'rgb(59, 130, 246)', // blue-500
      },
      {
        label: 'Required Nurses',
        data: shiftCoverage.map(s => s.recommended),
        backgroundColor: 'rgb(239, 68, 68)', // red-500
      }
    ]
  };

  // Bar chart options
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Nurses'
        }
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-red-800 dark:text-red-200 mb-2">
          Nurse Check-in Times Analysis
        </h3>
        <p className="text-red-700 dark:text-red-300">
          Average check-in times have increased by 25% this week. Review shift allocation below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Average Check-in Times (Last 30 Days)
          </h4>
          <div className="h-48">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Nurse Shift Coverage
          </h4>
          <div className="h-48">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
          Suggested Action
        </h4>
        <p className="text-yellow-700 dark:text-yellow-300">
          Consider reallocating 2 nurses from morning shift to afternoon shift at Downtown Health Clinic
        </p>
      </div>

      <button className="btn-primary">
        Update Shift Allocation
      </button>
    </div>
  );
};

export default NurseCheckInAnalysis; 