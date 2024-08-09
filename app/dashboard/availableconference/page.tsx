'use client'
import DashboardLayout from "@/app/components/DashboardLayout";
import { useEffect, useState } from "react";

const getOrdinalSuffix = (day: number) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
  }
};

const getFormattedDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('en-US', { month: 'long' });
  const year = dateObj.getFullYear();
  const suffix = getOrdinalSuffix(day);
  return `${month} ${day}${suffix}, ${year}`;
};

const AvailableConference = () => {
  const [conferences, setConferences] = useState([]);

    useEffect(() => {
        const fetchConferences = async () => {
            try {
                const response = await fetch('/api/allconferences'); // Replace with the correct API endpoint
                const data = await response.json();
                setConferences(data);
            } catch (error) {
                console.error('Failed to fetch conferences', error);
            }
        };

        fetchConferences();
    }, []);

  return (
    
    <DashboardLayout>
      {/* <WelcomeCard /> */}
      <div className="bg-white p-6 rounded-lg">
        <div className="mt-6">
          <h3 className="text-lg font-medium">Available Conference</h3>
          <p className="text-sm text-gray-600">
           Below is a list of available conferences that you can attend.
          </p>
          <table className="min-w-full divide-y divide-gray-200 mt-6">
              <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conference Name</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conference Date</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Deadline</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {conferences.map((conference: any) => (
                    <tr key={conference.id} className="text-gray-700 text-xs">
                        <td className="py-2 px-4">{conference.name}</td>
                        <td className="py-2 px-4">
                            <p className="text-xs">Conference Date</p>
                            <p>{getFormattedDate(conference.startDate)} - {getFormattedDate(conference.endDate)}</p>
                        </td>
                        <td className="py-2 px-4">
                            <p className="text-xs">Full Paper Submission</p>
                            <p>{getFormattedDate(conference.submission_deadlineStart)} - {getFormattedDate(conference.submission_deadlineEnd)}</p>
                        </td>
                        <td className="py-2 px-4">
                          <button
                            className="btn btn-ghost btn-xs text-blue-950 underline">
                            Create new submission
                          </button>
                          <button
                            className="btn btn-ghost btn-xs text-blue-950 underline">
                            View details
                          </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AvailableConference;
