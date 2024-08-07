'use client'
import DashboardLayout from "@/app/components/DashboardLayout"
import WelcomeCard from "@/app/components/WelcomeCard";
import { useEffect, useState } from "react";

type Paper = {
  id: number;
  paper_title: string;
  status: string;
  paper: string;
  conferenceId: number;
  createdAt: Date;
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
        <WelcomeCard />

        <div className="bg-white p-6 rounded-lg mt-4">
        <div className="mt-6">
          <h3 className="text-lg font-medium">My Reviews</h3>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <hr className="mt-2"/>

          <table className="min-w-full bg-white mt-6 text-left">
                        <thead>
                            <tr className="text-xs">
                                <th className="py-2">Paper Title</th>
                                <th className="py-2">Conference</th>
                                <th className="py-2">Abstract</th>
                                <th className="py-2">Paper File</th>
                                <th className="py-2">Status</th>
                                <th className="py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {papers.map((paper) => (
                                <tr key={paper.id} className="text-gray-700 text-xs text-left">
                                    <td className="py-2">{paper.paper_title}</td>
                                    <td className="py-2">{paper.conference.name}</td>
                                    <td className="py-2">
                                        <button className="btn btn-ghost btn-xs text-blue-950 underline" onClick={() => handleModalOpen(paper)}>
                                            View abstract
                                        </button>
                                    </td>
                                    <td className="py-2">
                                        <a className="underline text-blue-950" href={`/uploads/papers/${paper.paper}`} target="_blank" rel="noopener noreferrer">
                                            View Paper
                                        </a>
                                    </td>
                                    <td className="py-2">{paper.status}</td>
                                    <td className="py-2">
                                        {/* Add your actions here */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

export default MyReviews