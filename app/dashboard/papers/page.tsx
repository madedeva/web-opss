'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';
import WelcomeCard from '@/app/components/WelcomeCard';
import UpdatePaper from './updatePaper';

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
    institution: string;
    topic: string;
    abstract: string;
    keywords: string;
    country: string;
    city: string;
    status: string;
    paper: string;
    userId: number;
    conferenceId: number;
    createdAt: Date;
    user: {
        name: string;
        email: string;
    };
    conference: {
        id: number;
        name: string;
        description: string;
        submission_deadlineStart: Date;
        submission_deadlineEnd: Date;
        paper_template: string;
        User: {
            name: string;
            email: string;
        };
    };
};

const Papers = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
    const [papers, setPapers] = useState<Paper[]>([]);
    const [selectedConference, setSelectedConference] = useState<string | null>(null);

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const handleModalOpen = (paper: Paper) => {
        setSelectedPaper(paper);
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setSelectedPaper(null);
        setIsOpen(false);
    };

    useEffect(() => {
        const fetchPapers = async () => {
            try {
                const response = await fetch('/api/papersubmission');
                const data: Paper[] = await response.json();
                setPapers(data);
            } catch (error) {
                console.error('Error fetching papers:', error);
            }
        };

        fetchPapers();
    }, []);

    const handleConferenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedConference(e.target.value || null);
        setCurrentPage(1); // Reset to the first page when changing filter
    };

    const uniqueConferenceIds = Array.from(new Set(papers.map((paper) => paper.conferenceId)));

    const filteredPapers = selectedConference
        ? papers.filter((paper) => paper.conferenceId.toString() === selectedConference)
        : papers;

    // Pagination Logic
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedPapers = filteredPapers.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredPapers.length / itemsPerPage);

    return (
        <DashboardLayout>
            {/* <WelcomeCard /> */}

            <div className="bg-white p-6 rounded-lg">
                <div className="mt-6">
                    <h3 className="text-lg font-medium">Submitted Papers</h3>
                    <p className="text-sm text-gray-600">
                    The following are papers submitted by authors, you can manage these papers.
                    </p>
                    <hr className="mt-2" />

                    <div className="mt-4">
                        <label htmlFor="conference" className="block text-sm font-medium text-gray-700">
                            Filter by Conference
                        </label>
                        <select
                            id="conference"
                            name="conference"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white"
                            onChange={handleConferenceChange}
                            value={selectedConference || ''}
                        >
                            <option value="">All Conferences</option>
                            {uniqueConferenceIds.map((conferenceId) => (
                                <option key={conferenceId} value={conferenceId.toString()}>
                                    {papers.find((paper) => paper.conferenceId === conferenceId)?.conference.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <table className="min-w-full divide-y divide-gray-200 mt-6">
                        <thead className="bg-gray-50">
                            <tr className="text-xs border-b border-gray-200">
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Paper Title
                                </th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Author
                                </th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Submit Date
                                </th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Topic, Abstract, Keywords
                                </th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    City, Country
                                </th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Paper File
                                </th>
                                <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedPapers.map((paper) => (
                                <tr key={paper.id} className="text-gray-700 text-xs border-b border-gray-200">
                                    <td className="py-2 px-4">{paper.paper_title}</td>
                                    <td className="py-2 px-4">
                                        <p className='font-bold'>{paper.user.name},</p><p>({paper.institution}, {paper.user.email})</p>
                                    </td>
                                    <td className="py-2 px-4">{getFormattedDate(paper.createdAt)}</td>
                                    <td className="py-2 px-4">
                                        <p className='font-bold'>Topic</p>
                                        <p>{paper.topic}</p>
                                        <p className="mt-4 font-bold">Abstract</p>
                                        <button className="btn btn-ghost btn-xs text-blue-950 underline" onClick={() => handleModalOpen(paper)}>
                                            View abstract
                                        </button>
                                        <p className="mt-4">Keywords</p>
                                        <p>{paper.keywords}</p>
                                    </td>
                                    <td className="py-2 px-4">{paper.city}, {paper.country}</td>
                                    <td className="py-2 px-4">
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
                                    <td className="py-2 px-4">
                                        <a className="underline text-blue-950 text-xs" href={`/uploads/papers/${paper.paper}`} target="_blank" rel="noopener noreferrer">
                                            View Paper
                                        </a>
                                    </td>
                                    <td className="py-2 px-4">
                                        <UpdatePaper users={[]} userId={0} conRevId={0} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="btn btn-sm btn-primary"
                        >
                            Previous
                        </button>
                        <span className="text-sm">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="btn btn-sm btn-primary"
                        >
                            Next
                        </button>
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
    );
};

export default Papers;
