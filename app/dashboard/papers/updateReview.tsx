"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { ReviewComments } from '@prisma/client';

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

const UpdateReviewComment = ({ submissionId }: ReviewCommentProps) => {
    const [reviewComments, setReviewComments] = useState<ReviewComment[]>([]);
    const [selectedComment, setSelectedComment] = useState<ReviewComment | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleUpdate = async (reviewId: number) => {
        setLoading(true);
        setError(null);
    
        try {
            console.log("Updating review with ID:", reviewId, selectedComment);

            if (!selectedComment) {
                throw new Error("No comment selected.");
            }
    
            const response = await axios.put(`/api/reviewcomments/${reviewId}`, {
                comments: selectedComment.comments,
                status: selectedComment.status,
                sendReview: selectedComment.sendReview
            });
    
            console.log("Update successful:", response.data);
    
            setIsModalOpen(false);
        } catch (error: any) {
            console.error("Error updating review comment:", error);
            if (error.response) {
                console.error("API response error:", error.response.data);
                setError(`Error updating review comment: ${error.response.data.message || error.message}`);
            } else {
                setError("Error updating review comment");
            }
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div>
            <button
                className="text-xs text-blue-950 hover:text-indigo-900 underline mt-2"
                onClick={() => setIsModalOpen(true)}
            >
                Review History
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-full sm:max-w-md md:max-w-2xl lg:max-w-2xl max-h-screen overflow-y-auto">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>

                        <h3 className="font-bold text-lg mb-4">Review History</h3>

                        {error && <p className="text-red-500">{error}</p>}

                        <div className="overflow-y-auto space-y-3">
                            {reviewComments.length === 0 ? (
                                <p className="text-gray-500 text-lg">No reviews available.</p>
                            ) : (
                                reviewComments.map((review) => (
                                    <div
                                        key={review.id}
                                        className={`border p-3 mb-2 rounded cursor-pointer hover:bg-gray-100 ${
                                            selectedComment?.id === review.id ? "bg-blue-100" : ""
                                        }`}
                                        onClick={() => setSelectedComment(review)}
                                    >   
                                        <p className="font-semibold mb-2">Reviewer: {review.User.name}</p>
                                        {review.status === 'Accepted' && (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Accepted
                                            </span>
                                        )}
                                        {review.status === 'Revision' && (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                                Revision
                                            </span>
                                        )}
                                        {review.status === 'Rejected' && (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                Rejected
                                            </span>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        {selectedComment && (
                            <div className="mt-4">
                                <hr className="mb-4" />
                                <div className="mt-2">
                                    <label className="block mb-2 text-sm font-medium">Reviewer</label>
                                    <p className="text-wrap">{selectedComment.User.name}</p>
                                </div>
                                <div className="mt-2">
                                    <label className="block mb-2 text-sm font-medium">Comments</label>
                                    <p className="text-wrap">{selectedComment.comments}</p>
                                </div>

                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium">Status</label>
                                    {selectedComment.status === 'Accepted' && (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Accepted
                                        </span>
                                    )}
                                    {selectedComment.status === 'Revision' && (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                            Revision
                                        </span>
                                    )}
                                    {selectedComment.status === 'Rejected' && (
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                            Rejected
                                        </span>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <label className="block mb-2 text-sm font-medium">Send Review to Author</label>
                                    <div className="flex items-center space-x-4">
                                        <label className="label cursor-pointer">
                                            <input
                                                type="radio"
                                                name="sendReview"
                                                className="radio"
                                                checked={selectedComment.sendReview === "Yes"}
                                                onChange={() => setSelectedComment({
                                                    ...selectedComment,
                                                    sendReview: "Yes"
                                                })}
                                            />
                                            <span className="ml-2">Yes</span>
                                        </label>
                                        <label className="label cursor-pointer">
                                            <input
                                                type="radio"
                                                name="sendReview"
                                                className="radio"
                                                checked={selectedComment.sendReview === "No"}
                                                onChange={() => setSelectedComment({
                                                    ...selectedComment,
                                                    sendReview: "No"
                                                })}
                                            />
                                            <span className="ml-2">No</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-2 mt-4">
                                    <button
                                        className="btn text-white"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn bg-blue-950 text-white"
                                        onClick={() => handleUpdate(selectedComment.id)}
                                        disabled={loading}
                                    >
                                        {loading ? "Updating..." : "Update Review"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateReviewComment;
