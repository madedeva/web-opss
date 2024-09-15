"use client";
import { useState, useEffect } from "react";
import axios from "axios";

type ReviewCommentProps = {
    submissionId: number | undefined;
};

type ReviewComment = {
    id: number;
    comments: string;
    status: string;
    createdAt: string;
};

const ReviewComments = ({ submissionId }: ReviewCommentProps) => {
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
                setReviewComments(response.data);
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
                View Review Comments
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
                                    {reviewComments.map((comment) => (
                                        <li key={comment.id} className="p-4 bg-gray-100 text-gray-700 rounded-lg">
                                            <p><strong>Comments:</strong> {comment.comments}</p>
                                            <p><strong>Status:</strong> {comment.status}</p>
                                            <p><strong>Date:</strong> {new Date(comment.createdAt).toLocaleDateString()}</p>
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

export default ReviewComments;
