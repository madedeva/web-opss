'use client'
import DeleteConference from "@/app/dashboard/conference/deleteConference";
import UpdateConference from "@/app/dashboard/conference/updateConference";
import { useEffect, useState } from "react";

interface Conference {
  id: string;
  name: string;
  startDate: Date | string;
  endDate: Date | string;
  submission_deadlineStart: Date | string;
  submission_deadlineEnd: Date | string;
  status: string;
  _count?: {
    RegisterConference: number;
  };
}

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

const TableConferenceAdmin = () => {
    const [conferences, setConferences] = useState<Conference[]>([]);

    useEffect(() => {
        const fetchConferences = async () => {
            try {
                const response = await fetch('/api/adminallconferences');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Conference[] = await response.json();
                setConferences(data);
            } catch (error) {
                console.error('Failed to fetch conferences:', error);
            }
        };

        fetchConferences();
    }, []);

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 mt-6">
            <thead className="bg-gray-50">
                <tr className="text-xs border-b border-gray-200">
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conference Name</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conference Date</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submission Deadline</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statistic</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
            </thead>
            <tbody>
                {conferences.map((conference) => (
                    <tr key={conference.id} className="text-gray-700 text-xs border-b border-gray-200">
                        <td className="py-2 px-4">{conference.name}</td>
                        <td className="py-2 px-4 w-60">
                            <p className="text-xs font-bold">Conference Date</p>
                            <p>{getFormattedDate(conference.startDate)} - {getFormattedDate(conference.endDate)}</p>
                        </td>
                        <td className="py-2 px-4 w-60">
                            <p className="text-xs font-bold">Full Paper Submission</p>
                            <p>{getFormattedDate(conference.submission_deadlineStart)} - {getFormattedDate(conference.submission_deadlineEnd)}</p>
                        </td>
                        <td className="py-2 px-4">
                            <p><a className="underline text-blue-950 text-xs" href="/dashboard/papers">Submitted Paper ({conference._count?.RegisterConference ?? 0})</a></p>
                        </td>
                        <td className="py-2 px-4">
                            {conference.status === 'Active' ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Active
                                </span>
                            ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    Inactive
                                </span>
                            )}
                        </td>
                        <td className="py-2 px-4">
                            {/* <UpdateConference conference={conference}/>
                            <DeleteConference conference={conference}/> */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
};

export default TableConferenceAdmin;
