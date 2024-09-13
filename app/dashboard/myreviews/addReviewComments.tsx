"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type AddReviewCommentProps = {
    submissionId: number | undefined;
    userId: number | undefined;
};

const AddReviewComments = ({ submissionId, userId }: AddReviewCommentProps) => {
    const [comments, setComments] = useState("");
    const [status, setStatus] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        // Confirmation for Accepted or Rejected status
        if (status === "Accepted" || status === "Rejected") {
            const isConfirmed = window.confirm(`Are you sure you want to select status: ${status}?`);
            if (!isConfirmed) {
                return;
            }
        }

        try {
            await axios.post(`/api/reviewcomments`, {
                comments,
                status,
                sendReview: "No",
                submissionId,
                userId,
            });

            toast.success('Review comment added successfully!');
            setComments("");
            setStatus("");

            router.refresh();
            setIsOpen(false);
        } catch (error) {
            console.error("Error adding review comment:", error);
            toast.error('Review comment failed to be added: ' + error);
        }
    };

    const handleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="text-xs text-blue-950 hover:text-indigo-900 underline mt-2" onClick={handleModal}>
                + Add New Review
            </button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white text-gray-700 w-full max-w-2xl">
                    <h3 className="font-bold text-lg">Add Review Comment</h3>
                    <hr className="mb-4"/>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full mt-6">
                            <label className="mb-2 text-lg">Comments <span className="text-red-600">*</span></label>
                            <textarea 
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                id="message" rows={8} className="block p-2.5 w-full text-sm rounded-lg border bg-white" placeholder="Type your review here"
                                required
                            />
                        </div>
                        <div className="form-control w-full mt-4">
                            <label className="mb-2 text-lg">Status <span className="text-red-600">*</span></label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="select select-bordered bg-white"
                                required
                            >
                                <option value="" disabled>--Select Status--</option>
                                <option value="Revision">Revision</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="modal-action mt-6">
                            <button type="button" className="btn text-white" onClick={handleModal}>Cancel</button>
                            <button type="submit" className="btn bg-blue-950 text-white">Add Review Comment</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReviewComments;
