'use client'
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
        name: string
        email: string
    },
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

const Papers = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleModal = () => {
        setIsOpen(!isOpen);
    }

    const [papers, setPapers] = useState<Paper[]>([]);
    const [groupedPapers, setGroupedPapers] = useState({});

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
            <WelcomeCard />

            <div className="bg-white p-6 rounded-lg mt-4">
                <div className="mt-6">
                    <h3 className="text-lg font-medium">Submitted Papers</h3>
                    <p className="text-sm text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <hr className="mt-2" />

                    <table className="min-w-full bg-white mt-6 text-left">
                        <thead>
                            <tr className="text-sm">
                                <th className="py-2">Paper Title</th>
                                <th className="py-2">Author</th>
                                <th className="py-2">Submit Date</th>
                                <th className="py-2">Topic, Abstract, Keywords</th>
                                <th className="py-2">City, Country</th>
                                <th className="py-2">Status</th>
                                <th className="py-2">Paper File</th>
                                <th className="py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {papers.map((paper) => (
                                <tr key={paper.id} className="text-gray-700 text-sm text-left">
                                    <td className="py-2">{paper.paper_title}</td>
                                    <td className="py-2">{paper.user.name}</td>
                                    <td className="py-2">{getFormattedDate(paper.createdAt)}</td>
                                    <td className="py-2">
                                        <p>Topic</p>
                                        <p>{paper.topic}</p>
                                        <p className="mt-4">Abstract</p>
                                        <button className="btn btn-ghost btn-sm text-blue-950 underline" onClick={handleModal}>
                                            View abstract
                                        </button>
                                        <p className="mt-4">Keywords</p>
                                        <p>{paper.keywords}</p>
                                    </td>
                                    <td className="py-2">{paper.city}, {paper.country}</td>
                                    <td className="py-2">{paper.status}</td>
                                    <td className="py-2">
                                        <a className="underline text-blue-950" href={`/uploads/papers/${paper.paper}`} target="_blank" rel="noopener noreferrer">
                                            View Paper
                                        </a>
                                    </td>
                                    <td className="py-2">
                                        <UpdatePaper users={[]} userId={0} conRevId={0} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {papers.map((paper) => (
                    <div className={isOpen ? 'modal modal-open' : 'modal'}>
                        <div className="modal-box bg-white">
                            <h3 className="font-bold text-lg">Paper Title: {paper.paper_title}</h3>
                            <hr className='mt-4'/>
                            <p className="py-4">
                            {paper.abstract}
                            </p>
                            <div className="modal-action">
                            <button type="button" className="btn text-white" onClick={handleModal}>Close</button>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Papers;
