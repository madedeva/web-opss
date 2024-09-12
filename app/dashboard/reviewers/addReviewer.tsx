"use client";
import { useState, SyntheticEvent } from "react";
import type { Conference, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomAlert from "@/app/components/Alert/CustomAlert";

const AddReviewer = ({ users, conferences }: { users: User[]; conferences: Conference[] }) => {
    const { data: session } = useSession();
    const user = session?.user as User;

    const filteredConferences = Array.isArray(conferences) 
    ? conferences.filter(conference => {
        return conference.status === "Active" && conference.userId === user?.id;
    })
    : [];

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
    const [selectedConferenceId, setSelectedConferenceId] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [alert, setAlert] = useState<{ type: 'info' | 'danger' | 'success' | 'warning' | 'dark'; message: string } | null>(null);
    const router = useRouter();

    const filteredUsers = users
        .filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !selectedUserIds.includes(user.id)  // Exclude already selected users
        );

        const handleSubmit = async (e: SyntheticEvent) => {
            e.preventDefault();
            try {
                const response = await axios.post('/api/reviewer', {
                    userIds: selectedUserIds,
                    conferenceId: parseInt(selectedConferenceId),
                });
                const data = response.data;
        
                if (data.message.includes('No new reviewers to add')) {
                    toast.warn('Some reviewers are already added.');
                } else {
                    setSelectedUserIds([]);
                    setSelectedConferenceId('');
                    setSearchQuery('');
                    toast.success(data.message);
                    router.refresh();
                    setIsOpen(false);
                }
            } catch (error: any) {
                console.error('Failed to add reviewers:', error);
                toast.error('Failed to add reviewers.');
            }
        };        

    const handleSelectUser = (userId: number) => {
        if (selectedUserIds.includes(userId)) {
            toast.info('Reviewer has already been added!');
        } else {
            setSelectedUserIds([...selectedUserIds, userId]);
        }
    };

    const handleRemoveUser = (userId: number) => {
        setSelectedUserIds(selectedUserIds.filter(id => id !== userId));
    };

    const handleModalToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {alert && <CustomAlert type={alert.type} message={alert.message} />}
            <button className="bg-blue-950 text-white px-4 py-2 rounded-full" onClick={handleModalToggle}>
                + Add New Reviewer
            </button>

            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box bg-white w-full max-w-2xl text-gray-700">
                    <h3 className="font-bold text-lg text-center">Add New Reviewer</h3>
                    <hr className="mb-4"/>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Select Conference <span className="text-red-600">*</span></p>
                            <select
                                value={selectedConferenceId}
                                onChange={(e) => setSelectedConferenceId(e.target.value)}
                                className="select select-bordered bg-white"
                                required
                            >
                                <option value="" disabled>--Select Conference--</option>
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
                        <div className="form-control w-full mt-6">
                            <p className="mb-2">Search Reviewers</p>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input input-bordered w-full mb-4 bg-white"
                                placeholder="Search reviewers..."
                            />
                            {searchQuery && (
                                <ul className="list-none p-0">
                                    {filteredUsers.length === 0 ? (
                                        <li className="p-2 text-gray-500">No reviewers found</li>
                                    ) : (
                                        filteredUsers.map(user => (
                                            <li
                                                key={user.id}
                                                className="flex justify-between items-center p-2 border-b cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleSelectUser(user.id)}
                                            >
                                                {user.name}
                                            </li>
                                        ))
                                    )}
                                </ul>
                            )}
                            <hr />
                            <div className="mt-4">
                                <p className="mb-2 font-medium">Selected Reviewers <span className="text-red-600">*</span></p>
                                <ul className="list-none p-0">
                                    {selectedUserIds.map(userId => {
                                        const user = users.find(u => u.id === userId);
                                        return user ? (
                                            <li key={userId} className="flex justify-between items-center mb-2">
                                                {user.name}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveUser(userId)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    &times;
                                                </button>
                                            </li>
                                        ) : null;
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn text-white" onClick={handleModalToggle}>
                                Close
                            </button>
                            <button type="submit" className="btn bg-blue-950 text-white">
                                Save Reviewers
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReviewer;
