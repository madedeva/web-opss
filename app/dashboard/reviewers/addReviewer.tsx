"use client";
import { useState, SyntheticEvent } from "react";
import type { Conference, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";

const AddReviewer = ({ users, conferences }: { users: User[]; conferences: Conference[] }) => {
    const { data: session } = useSession();
    const user = session?.user as User;

    const filteredConferences = conferences.filter(conference => 
        conference.status === "Active" && conference.userId === user?.id
    );

    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedConferenceId, setSelectedConferenceId] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/review', {
                userId: parseInt(selectedUserId),
                conferenceId: parseInt(selectedConferenceId),
            });
            setSelectedUserId('');
            setSelectedConferenceId('');
            router.refresh();
            setIsOpen(false);
        } catch (error) {
            console.error('Failed to add reviewer:', error);
        }
    };

    const handleModalToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button className="bg-blue-950 text-white px-4 py-2 rounded-full" onClick={handleModalToggle}>
                + New Reviewer
            </button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white">
                    <h3 className="font-bold text-lg">Add New Reviewer</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Reviewer</label>
                            <select
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                className="select select-bordered bg-white"
                                required
                            >
                                <option value="" disabled>Select Reviewer</option>
                                {users.length === 0 ? (
                                    <option disabled>No reviewers available</option>
                                ) : (
                                    users.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Select Conference</label>
                            <select
                                value={selectedConferenceId}
                                onChange={(e) => setSelectedConferenceId(e.target.value)}
                                className="select select-bordered bg-white"
                                required
                            >
                                <option value="" disabled>Select Conference</option>
                                {filteredConferences.length === 0 ? (
                                    <option disabled>No active conferences available</option>
                                ) : (
                                    filteredConferences.map(conference => (
                                        <option key={conference.id} value={conference.id}>
                                            {conference.name}
                                        </option>
                                    ))
                                )}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn text-white" onClick={handleModalToggle}>
                                Close
                            </button>
                            <button type="submit" className="btn btn-accent text-white">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReviewer;
