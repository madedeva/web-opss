'use client';
import DashboardLayout from "@/app/components/DashboardLayout";
import { useSession } from "next-auth/react";
import { SyntheticEvent, useEffect, useState } from "react";
import CustomAlert from "@/app/components/Alert/CustomAlert";
import axios from "axios";
import DOMPurify from 'dompurify';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddReviewComments from "@/app/dashboard/myreviews/addReviewComments";
import ReviewComments from "@/app/dashboard/myreviews/showReviewComments";

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

    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${month} ${day}${suffix}, ${year} ${hours}:${minutes} ${ampm}`;
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
    comments: string;
    conrevId: Number;
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
    },
    ReviewComments: {
        id: number;
        comments: string;
        status: string;
        sendReview: string;
    }[],
    Authors: {
        id: number,
        name: string,
        email: string,
        institution: string
    }[],
    Revision: {
        id: number,
        paper_title: string,
        topic: string,
        abstract: string,
        keywords: string,
        paper: string,
        createdAt: Date,
    }[]
};

type User = {
    id: number,
    name: string,
    email: string,
    roleId: number
}

const MyReviewTable = () => {
    const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPaper2, setSelectedPaper2] = useState<Paper | null>(null);
    const [isOpen2, setIsOpen2] = useState(false);
    const [papers, setPapers] = useState<Paper[]>([]);
    const [comments, setComment] = useState('');
    const [statusPaper, setStatusPaper] = useState('Pending');
    const [paperId, setPaperId] = useState<number>();
    const { data: session, status, update } = useSession()
    const [user, setUser] = useState<User>();

    const [selectedRevision, setSelectedRevision] = useState<Paper["Revision"] | null>(null);
    const [isRevisionOpen, setIsRevisionOpen] = useState(false);

    const [alert, setAlert] = useState<{ type: 'info' | 'danger' | 'success' | 'warning' | 'dark'; message: string } | null>(null);

    const handleRevisionModalOpen = (revisions: Paper["Revision"]) => {
        console.log('Opening revisions modal with:', revisions);
        setSelectedRevision(revisions);
        setIsRevisionOpen(true);
      };

    const fetchPapers = async () => {
        try {
            const response = await fetch(`/api/reviewsubmission?userId=${user!.id}`);
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data)) {
                    setPapers(data);
                } else {
                    console.error('Expected an array of papers, but got:', data);
                }
            } else {
                console.error('Failed to fetch papers:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching papers:', error);
        }
    };

    useEffect(() => {

        if (session?.user) {
            const user = session.user as User;
            setUser(user);
        }

    
        fetchPapers();
    }, [user, session]);

    const handleModalOpen = (paper: Paper) => {
        setSelectedPaper(paper);
        setIsOpen(true);
    };

    const handleModalClose = () => {
        setSelectedPaper(null);
        setIsOpen(false);
        setIsRevisionOpen(false);
    };

    const handleModalOpen2 = (paper: Paper) => {
        setPaperId(paper.id);
        setSelectedPaper2(paper);
        setIsOpen2(true);
    };

    const handleModalClose2 = () => {
        setSelectedPaper2(null);
        setIsOpen2(false);
    };
    
    // comments on register conference
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        try {
            await axios.put(`/api/reviewsubmission/${paperId}`, {
                comments: comments,
                status: statusPaper,
            });
            
            setIsOpen2(false);
            toast.success('Review submitted!');
            fetchPapers();
        } catch (error: any) {
            console.error('Error submitting the form:', error);
            toast.error('Review submit failed:' + error.message);
            setTimeout(() => setAlert(null), 5000);
        }
    
    }

    return (
            <div className="bg-white p-6 rounded-lg">
                {alert && <CustomAlert type={alert.type} message={alert.message} />}
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
                                        Paper
                                    </th>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Revisions
                                    </th>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {papers?.map((paper) => (
                                    <tr key={paper.id}>
                                        <td className="px-3 py-2 whitespace-normal break-words">
                                            <div className="text-xs font-medium text-gray-900">{paper.paper_title}</div>
                                        </td>
                                        <td className="px-3 py-2 whitespace-normal break-words">
                                            <div className="text-xs text-gray-900">{paper.conference.name}</div>
                                        </td>
                                        <td className="px-3 py-2 whitespace-normal break-words text-nowrap">
                                            <div className="flex flex-col space-y-2">
                                                <button className="text-xs text-blue-950 underline hover:text-indigo-900" onClick={() => handleModalOpen(paper)}>
                                                    View Abstract
                                                </button>
                                                <a className="text-xs text-blue-950 underline hover:text-indigo-900" href={`/uploads/papers/${paper.paper}`} target="_blank" rel="noopener noreferrer">
                                                    View Paper
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-3 py-2 whitespace-normal text-nowrap">
                                            <button
                                                className="text-xs text-blue-950 underline hover:text-indigo-900 block mt-2"
                                                onClick={() => handleRevisionModalOpen(paper.Revision)}
                                                >
                                                    Revisions History
                                            </button>
                                            <ReviewComments submissionId={paper.id}/>
                                        </td>
                                        <td className="px-3 py-2 whitespace-normal break-words">
                                            {paper.status === 'Accepted' && (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Accepted
                                                </span>
                                            )}
                                            {paper.status === 'Submitted' && (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                    Submitted
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
                                        <td className="px-3 py-2 whitespace-normal text-xs font-medium text-nowrap">
                                            <div className="block">
                                                <div className="block">
                                                {paper.status === 'Accepted' ? (
                                                    <span className="text-green-600">Review complete</span>
                                                ) : paper.status === 'Rejected' ? (
                                                    <span className="text-red-600">Paper Rejected</span>
                                                ) : null}

                                                {/* {paper.status === 'Accepted' ? (
                                                    <span className="text-green-600">Review complete</span>
                                                ) : paper.status === 'Rejected' ? (
                                                    <span className="text-red-600">Paper Rejected</span>
                                                ) : (
                                                    <button className="text-xs text-blue-950 underline hover:text-indigo-900" onClick={() => handleModalOpen2(paper)}>
                                                        Review paper
                                                    </button>
                                                )} */}
                                                </div>
                                                {paper.status !== 'Accepted' && paper.status !== 'Rejected' && (
                                                    <div className="block">
                                                        <AddReviewComments submissionId={paper.id} userId={user?.id}/>
                                                    </div>
                                                )}
                                                {/* <div className="block mt-2">
                                                    <AddReviewComments submissionId={paper.id} userId={user?.id}/>
                                                </div> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {isOpen && selectedPaper && (
                        <div className="modal modal-open">
                            <div className="modal-box bg-white text-gray-700">
                                <h3 className="font-bold text-lg">Paper Title: {selectedPaper.paper_title}</h3>
                                <hr className="mt-4" />
                                <div className="py-4" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedPaper.abstract) }} />
                                <div className="modal-action">
                                    <button type="button" className="btn text-white" onClick={handleModalClose}>Close</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {isOpen2 && selectedPaper2 && (
                        <div className="modal modal-open">
                            <div className="modal-box bg-white w-full max-w-2xl text-gray-700">
                            <form onSubmit={handleSubmit}>
                                <h3 className="font-bold text-lg">Paper Title: {selectedPaper2.paper_title}</h3>
                                <hr className="mt-4" />
                                    <p className="font-bold mt-4">Paper Abstract: </p>
                                    <p className="py-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedPaper2.abstract) }}/>
                                    <hr className="mt-2"/>
                                        <input type="hidden" name="peperId" value={selectedPaper2.id}/>
                                        <div className="form-control w-full mt-4">
                                            <label className="label">Review Comments</label>
                                            <textarea 
                                            value={comments}
                                            onChange={(e) => setComment(e.target.value)}
                                            id="message" rows={8} className="block p-2.5 w-full text-sm rounded-lg border bg-white" placeholder="Type your review here"></textarea>
                                        </div>
                                        <div className="form-control w-full mt-6">
                                            <label className="mb-2">Status</label>
                                            <select 
                                            value={statusPaper}
                                            onChange={(e) => setStatusPaper(e.target.value)}
                                            onClick={(e) => {
                                                const target = e.target as HTMLSelectElement;
                                                setStatusPaper(target.value);
                                            }}
                                            className="select select-bordered bg-white" required>
                                                <option value="">-- Select Submission Status --</option>
                                                <option value="Accepted">Accepted</option>
                                                <option value="Revision">Revision</option>
                                                <option value="Rejected">Rejected</option>
                                            </select>
                                        </div>

                                <div className="modal-action">
                                    <button type="button" className="btn text-white" onClick={handleModalClose2}>Cancel</button>
                                    <button type="submit" className="btn bg-blue-950 text-white" onClick={handleSubmit}>Submit Review</button>
                                </div>
                                </form>
                            </div>
                        </div>
                    )}


                    {isRevisionOpen && selectedRevision && (
                        <div className="modal modal-open">
                        <div className="modal-box bg-gray-50 shadow-xl rounded-lg w-full max-w-4xl">
                        <div className="flex justify-between items-center border-b pb-3">
                            <h3 className="text-2xl font-semibold text-gray-800">Revision History</h3>
                            <button 
                            className="text-gray-400 hover:text-gray-600" 
                            onClick={handleModalClose}
                            >
                            ✕
                            </button>
                        </div>
                    
                        <ul className="py-6 space-y-4">
                            {selectedRevision.map((revision) => (
                            <li key={revision.id} className="p-4 bg-gray-100 text-gray-700 rounded-lg">
                                <h4 className="text-xl font-bold text-gray-900">Paper Title: {revision.paper_title}</h4>
                                <p className="mb-4">Submit Date: {getFormattedDate(revision.createdAt)}</p>
                                <span className="block font-semibold text-gray-700 mb-1">Topic:</span> 
                                <p>{revision.topic}</p>
                                <div className="my-4">
                                <label className="block font-semibold text-gray-700 mb-1">Abstract:</label>
                                <div
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(revision.abstract) }}
                                />
                                </div>
                                <p className="mb-4"><span className="font-semibold">Keywords:</span> {revision.keywords}</p>
                                <a
                                className="text-blue-950 underline font-medium"
                                href={`/uploads/papers/${revision.paper}`}
                                download
                                >
                                Download Paper
                                </a>
                            </li>
                            ))}
                        </ul>
                    
                        <div className="modal-action flex justify-end mt-4">
                            <button 
                            type="button" 
                            className="btn bg-blue-950 text-white px-4 py-2 rounded-md"
                            onClick={handleModalClose}
                            >
                            Close
                            </button>
                        </div>
                        </div>
                    </div>          
                    )}
                </div>
            </div>
    );
};

export default MyReviewTable;
