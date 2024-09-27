"use client";
import { useState, useEffect } from "react";
import axios from "axios";

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

type ReviewCommentProps = {
    submissionId: number | undefined;
};

type ReviewComment = {
    id: number;
    comments: string;
    status: string;
    userId: number;
    sendReview: string;
    createdAt: string;
    User: {
        id: number;
        name: string;
    }
};

const ReviewCommentsAuthor = ({ submissionId }: ReviewCommentProps) => {
    const [reviewComments, setReviewComments] = useState<ReviewComment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchReviewComments = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/api/reviewcomments?submissionId=${submissionId}`);
                setReviewComments(response.data.ReviewComments);
            } catch (error) {
                setError("Error fetching review comments.");
                console.error("Error fetching review comments:", error);
            } finally {
                setLoading(false);
            }
        };

        if (submissionId) {
            fetchReviewComments();
        }
    }, [submissionId]);

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="text-xs text-blue-950 hover:text-indigo-900 underline mt-2" onClick={handleModal}>
                View Comments
            </button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white text-gray-700 w-full max-w-2xl">
                    <h3 className="font-bold text-lg">Review Comments</h3>
                    <hr className="mb-4"/>

                    {loading && <p>Loading comments...</p>}
                    {error && <p className="text-red-500">{error}</p>}

                    {!loading && !error && (
                        <div className="mt-6">
                            {reviewComments.length > 0 ? (
                                <ul className="space-y-4 mt-4">
                                    {reviewComments
                                        .filter(comment => comment.sendReview === "Yes")
                                        .map((comment) => (
                                            <li key={comment.id} className="p-4 bg-gray-100 text-gray-700 rounded-lg">
                                                <p><strong>Reviewer:</strong></p>
                                                <p>{comment.User.name}</p>
                                                <p className="mt-4"><strong>Comments:</strong></p>
                                                <p className="text-wrap">{comment.comments}</p>

                                                <p className="mt-4"><strong>Review Status:</strong></p>
                                                {comment.status === 'Accepted' && (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        Accepted
                                                    </span>
                                                )}
                                                {comment.status === 'Revision' && (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                        Revision
                                                    </span>
                                                )}
                                                {comment.status === 'Rejected' && (
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                        Rejected
                                                    </span>
                                                )}

                                                <p className="mt-4"><strong>Submitted Date:</strong></p>
                                                <p>{getFormattedDate(comment.createdAt)}</p>
                                            </li>
                                        ))}
                                </ul>
                            ) : (
                                <p>No review comments available for this submission.</p>
                            )}
                        </div>
                    )}

                    <div className="modal-action">
                        <button className="btn text-white" onClick={handleModal}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCommentsAuthor;
