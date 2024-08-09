'use client'
import DashboardLayout from "@/app/components/DashboardLayout"
import WelcomeCard from "@/app/components/WelcomeCard";
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

type Paper = {
  id: number;
  paper_title: string;
  status: string;
  paper: string;
  conferenceId: number;
  createdAt: Date;
  updatedAt: Date; 
  abstract: string;
  conference: {
    id: number,
    name: string,
    description: string,
    submission_deadlineStart: Date
    submission_deadlineEnd: Date
    paper_template: string
      User: {
          name: string,
          email: string,
      };
  }
};

const MyReviews = () => {
    const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleModalOpen = (paper: Paper) => {
        setSelectedPaper(paper);
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setSelectedPaper(null);
        setIsOpen(false);
    };

    const [papers, setPapers] = useState<Paper[]>([]);

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const response = await fetch('/api/registerconference');
                const data: Paper[] = await response.json();
                setPapers(data);
            } catch (error) {
                console.error('Error fetching papers:', error);
            }
        };

        fetchPapers();
    }, []);

    return (
    <DashboardLayout>
        {/* <WelcomeCard /> */}

        <div className="bg-white p-6 rounded-lg">
        <div className="mt-6">
          <h3 className="text-lg font-medium">Papers you need to review</h3>
          <p className="text-sm text-gray-600">
          These are the papers you need to review. Please go through them carefully.
          </p>
          <hr className="mt-6"/>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paper Title
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conference
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Abstract
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paper File
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                    </th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {papers.map((paper) => (
                    <tr key={paper.id}>
                    <td className="px-3 py-2 whitespace-normal break-words">
                        <div className="text-xs font-medium text-gray-900">{paper.paper_title}</div>
                    </td>
                    <td className="px-3 py-2 whitespace-normal break-words">
                        <div className="text-xs text-gray-900">{paper.conference.name}</div>
                    </td>
                    <td className="px-3 py-2 whitespace-normal break-words">
                        <button className="text-xs text-blue-950 underline hover:text-indigo-900" onClick={() => handleModalOpen(paper)}>
                        View abstract
                        </button>
                    </td>
                    <td className="px-3 py-2 whitespace-normal break-words">
                        <a className="text-xs text-blue-950 underline hover:text-indigo-900" href={`/uploads/papers/${paper.paper}`} target="_blank" rel="noopener noreferrer">
                        View Paper
                        </a>
                        <p className="text-xs">updated at: {getFormattedDate(paper.updatedAt)}</p>
                    </td>
                    <td className="px-3 py-2 whitespace-normal break-words">
                        {paper.status === 'Accepted' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Accepted
                        </span>
                        )}
                        {paper.status === 'Pending' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                        </span>
                        )}
                        {paper.status === 'Revision' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Revision
                        </span>
                        )}
                        {paper.status === 'Rejected' && (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Rejected
                        </span>
                        )}
                    </td>
                    <td className="px-3 py-2 whitespace-normal break-words">
                        <div className="text-xs text-gray-500">
                            {getFormattedDate(paper.updatedAt)}
                        </div>
                    </td>
                    <td className="px-3 py-2 whitespace-normal break-words text-xs font-medium">
                        {paper.status === 'Accepted' ? (
                        <span className="text-green-600">Review complete</span>
                        ) : (
                        <button className="text-xs text-blue-950 underline hover:text-indigo-900">
                            Review paper
                        </button>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

            {isOpen && selectedPaper && (
            <div className="modal modal-open">
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">Paper Title: {selectedPaper.paper_title}</h3>
                    <hr className="mt-4" />
                    <p className="py-4">
                        {selectedPaper.abstract}
                    </p>
                <div className="modal-action">
                    <button type="button" className="btn text-white" onClick={handleModalClose}>Close</button>
                </div>
            </div>
            </div>
            )}
        </div>
        </div>
    </DashboardLayout>
    )
};

export default MyReviews;
