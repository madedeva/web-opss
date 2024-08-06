'use client'
import { useEffect, useState } from 'react';
import DashboardLayout from '@/app/components/DashboardLayout';
import WelcomeCard from '@/app/components/WelcomeCard';

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
};

const Papers = () => {
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
                                    <td className="py-2">{paper.userId}</td>
                                    <td className="py-2">{paper.userId}</td>
                                    <td className="py-2">
                                      {paper.topic}
                                    </td>
                                    <td className="py-2">{paper.city}, {paper.country}</td>
                                    <td className="py-2">{paper.status}</td>
                                    <td className="py-2">
                                        <a href={`/uploads/papers/${paper.paper}`} target="_blank" rel="noopener noreferrer">
                                            View Paper
                                        </a>
                                    </td>
                                    <td className="py-2">
                                        {/* Add your actions here */}
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

export default Papers;
